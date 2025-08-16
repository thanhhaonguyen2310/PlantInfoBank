const fs = require('fs');
const path = require('path');

const dlFilePath = path.join(__dirname, 'src', 'dl');
const dl1FilePath = path.join(__dirname, 'src', 'dl1');
const outputFilePath = path.join(__dirname, 'import.sql');

console.log('🔄 Starting data conversion from dl + dl1 to import.sql ...');

function safeRead(p) {
  try {
    if (fs.existsSync(p)) return fs.readFileSync(p, 'utf8');
  } catch {}
  return '';
}

function normalizeSourceText(input) {
  let data = input || '';
  // Normalize line endings
  data = data.replace(/\r\n?/g, '\n');
  // Remove line-continuation backslashes
  data = data.replace(/\\\n/g, '');
  // Fix missing commas between tuples
  data = data.replace(/\)\s*\n\s*\(/g, '),\n(');
  // Ensure semicolon between statements
  data = data.replace(/\)\s*\n\s*INSERT INTO/gi, ');\nINSERT INTO');
  // Specific fix for a broken backtick-quoted english text
  data = data.replace(/`Your antoxian pigment doesn't count the base`/g, "'Your antoxian pigment doesn''t count the base'");

  // Table name normalizations (ordered)
  data = data.replace(/INSERT INTO\s+`thuoctinh_gionglua`\s*VALUES/gi, 'INSERT INTO `DetailSpecies` (`speciesId`, `propertiesId`, `propertiesvalueId`, `value`) VALUES');
  data = data.replace(/INSERT INTO\s+`detailspecies`/gi, 'INSERT INTO `DetailSpecies`');
  data = data.replace(/`propertiesvalues`/gi, '`PropertiesValues`');
  data = data.replace(/`typepropertys`/gi, '`TypePropertys`');
  data = data.replace(/`thuoctinh`/gi, '`Properties`');
  data = data.replace(/`detailimages`/gi, '`DetailImages`');
  data = data.replace(/`images`/gi, '`Images`');
  data = data.replace(/`species`/gi, '`Species`');
  data = data.replace(/`properties`/gi, '`Properties`');

  // Fix legacy dumps that miss the VALUES keyword after the column list
  // e.g. "INSERT INTO `DetailSpecies` (cols),\n(1, ...), (2, ...);" -> add VALUES
  data = data.replace(/(INSERT\s+INTO\s+`[^`]+`\s*\([^)]*\))\s*,\s*\(/gi, '$1 VALUES (');

  return data.trim();
}

function splitStatements(sql) {
  const stmts = [];
  let cur = '';
  let inQuote = false;
  for (let i = 0; i < sql.length; i++) {
    const ch = sql[i];
    cur += ch;
    if (ch === "'") {
      // handle escaped '' inside strings
      if (i + 1 < sql.length && sql[i + 1] === "'") {
        cur += sql[i + 1];
        i++;
        continue;
      }
      inQuote = !inQuote;
    }
    if (!inQuote && ch === ';') {
      const s = cur.trim();
      if (s) stmts.push(s);
      cur = '';
    }
  }
  const tail = cur.trim();
  if (tail) stmts.push(tail + ';');
  return stmts;
}

function parseTuples(valuesBlock) {
  // valuesBlock is like: (..),(..),(..)
  const tuples = [];
  let i = 0;
  function readTuple() {
    let depth = 0;
    let inQuote = false;
    let buf = '';
    while (i < valuesBlock.length) {
      const ch = valuesBlock[i++];
      buf += ch;
      if (ch === "'") {
        if (inQuote && valuesBlock[i] === "'") { // escaped quote
          buf += valuesBlock[i++];
          continue;
        }
        inQuote = !inQuote;
      }
      if (!inQuote) {
        if (ch === '(') depth++;
        else if (ch === ')') {
          depth--;
          if (depth === 0) break; // completed one tuple
        }
      }
    }
    return buf.trim();
  }

  while (i < valuesBlock.length) {
    // skip separators and whitespace
    while (i < valuesBlock.length && /[\s,]/.test(valuesBlock[i])) i++;
    if (i >= valuesBlock.length) break;
    if (valuesBlock[i] !== '(') {
      // malformed, stop
      break;
    }
    const t = readTuple();
    if (t) tuples.push(t);
    // skip trailing commas/whitespace
    while (i < valuesBlock.length && /[\s,]/.test(valuesBlock[i])) i++;
  }
  return tuples;
}

function splitFields(tupleStr) {
  // tupleStr includes parentheses: (a,b,'c')
  const inner = tupleStr.replace(/^\(/, '').replace(/\)$/,'');
  const fields = [];
  let inQuote = false;
  let cur = '';
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (ch === "'") {
      cur += ch;
      if (inQuote && inner[i + 1] === "'") {
        cur += inner[i + 1];
        i++;
      } else {
        inQuote = !inQuote;
      }
      continue;
    }
    if (ch === ',' && !inQuote) {
      fields.push(cur.trim());
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.length || inner.endsWith(',')) fields.push(cur.trim());
  return fields;
}

function makeTuple(fields) {
  return '(' + fields.join(',') + ')';
}

function ensureInsertWithColumns(stmt, table, columns) {
  const re = new RegExp('^INSERT\\s+(?:IGNORE\\s+)?INTO\\s+`' + table + '`\\s*(?:\\([^)]*\\))?\\s*VALUES\\s*(\\([\\s\\S]*\\))\\s*;?$', 'i');
  const m = stmt.match(re);
  if (!m) return null;
  const valuesBlock = m[1];
  const tuples = parseTuples(valuesBlock);
  return { tuples, columns };
}

function rebuildInsert(table, columns, tuples) {
  const colList = '(' + columns.join(',') + ')';
  return `INSERT INTO \`${table}\` ${colList} VALUES\n` + tuples.join(',\n') + ';';
}

function nowTuple() {
  return ['NOW()', 'NOW()'];
}

// Ensure Species tuples have exactly 6 fields: [name, name_other, origin_vn, origin_en, approve, genusId]
function padSpeciesFields(arr) {
  let r = Array.isArray(arr) ? arr.slice(0, 6) : [];
  if (r.length === 6) return r;
  if (r.length === 5) return [r[0], r[0], r[1], r[2], r[3], r[4]]; // duplicate name -> name_other
  if (r.length === 4) return [r[0], r[0], r[1], r[2], r[3], 'NULL'];
  if (r.length === 3) return [r[0], r[0], r[1], r[2], 'NULL', 'NULL'];
  if (r.length === 2) return [r[0], r[0], r[1], 'NULL', 'NULL', 'NULL'];
  if (r.length === 1) return [r[0], r[0], 'NULL', 'NULL', 'NULL', 'NULL'];
  return ['NULL','NULL','NULL','NULL','NULL','NULL'];
}

function transformStatements(statements) {
  const out = [];

  for (let s of statements) {
    const sNoSemi = s.replace(/;\s*$/, '');

    // Species: split into two groups to preserve numeric ids
    let specAny = ensureInsertWithColumns(sNoSemi, 'Species', []);
    if (specAny) {
      const tuplesNum = [];
      const tuplesAuto = [];
      for (const t of specAny.tuples) {
        const f = splitFields(t);
        // attempt to detect explicit id value in first field
        let first = (f[0] || '').trim();
        const isQuoted = /^'.*'$/.test(first);
        const isNumeric = !isQuoted && /^\d+$/.test(first);
        if (isNumeric && f.length >= 7) {
          // keep explicit id and next 6 fields
          const vals = [f[0], f[1], f[2], f[3], f[4], f[5], f[6]].concat(nowTuple());
          tuplesNum.push(makeTuple(vals));
        } else if (!isNumeric && f.length >= 6) {
          // treat tuple as [name, name_other, origin_vn, origin_en, approve, genusId]
          const rest = f.length >= 7 ? f.slice(1, 7) : f.slice(0, 6);
          const fixed = padSpeciesFields(rest);
          const vals = fixed.concat(nowTuple());
          tuplesAuto.push(makeTuple(vals));
        } else {
          // fallback: try to use last fields and pad to 6
          const rest = f.slice(-6);
          const fixed = padSpeciesFields(rest);
          const vals = fixed.concat(nowTuple());
          tuplesAuto.push(makeTuple(vals));
        }
      }
      if (tuplesNum.length) {
        out.push(rebuildInsert('Species', ['id','name','name_other','origin_vn','origin_en','approve','genusId','createdAt','updatedAt'], tuplesNum));
      }
      if (tuplesAuto.length) {
        out.push(rebuildInsert('Species', ['name','name_other','origin_vn','origin_en','approve','genusId','createdAt','updatedAt'], tuplesAuto));
      }
      continue;
    }

    // Properties: keep id, name_vn, name_en; add timestamps
    let prop = ensureInsertWithColumns(sNoSemi, 'Properties', []);
    if (prop) {
      const newTuples = prop.tuples.map(t => {
        const f = splitFields(t);
        const vals = [f[0] || 'NULL', f[1] || 'NULL', f[2] || 'NULL'].concat(nowTuple());
        return makeTuple(vals);
      });
      out.push(rebuildInsert('Properties', ['id','name_vn','name_en','createdAt','updatedAt'], newTuples));
      continue;
    }

    // TypePropertys
    let tprop = ensureInsertWithColumns(sNoSemi, 'TypePropertys', []);
    if (tprop) {
      const newTuples = tprop.tuples.map(t => {
        const f = splitFields(t);
        const vals = [f[0] || 'NULL', f[1] || 'NULL', f[2] || 'NULL'].concat(nowTuple());
        return makeTuple(vals);
      });
      out.push(rebuildInsert('TypePropertys', ['id','name_vn','name_en','createdAt','updatedAt'], newTuples));
      continue;
    }

    // PropertiesValues
    let pv = ensureInsertWithColumns(sNoSemi, 'PropertiesValues', []);
    if (pv) {
      const newTuples = pv.tuples.map(t => {
        const f = splitFields(t);
        const base = [f[0] || 'NULL', f[1] || 'NULL', f[2] || 'NULL', f[3] || 'NULL'];
        const vals = base.concat(nowTuple());
        return makeTuple(vals);
      });
      out.push(rebuildInsert('PropertiesValues', ['propertiesId','`option`','description','description_en','createdAt','updatedAt'], newTuples));
      continue;
    }

    // Images
    let imgs = ensureInsertWithColumns(sNoSemi, 'Images', []);
    if (imgs) {
      const newTuples = imgs.tuples.map(t => {
        const f = splitFields(t);
        const vals = [f[0] || 'NULL', f[1] || 'NULL'].concat(nowTuple());
        return makeTuple(vals);
      });
      out.push(rebuildInsert('Images', ['name','url','createdAt','updatedAt'], newTuples));
      continue;
    }

    // DetailImages
    let dimgs = ensureInsertWithColumns(sNoSemi, 'DetailImages', []);
    if (dimgs) {
      const newTuples = dimgs.tuples.map(t => {
        const f = splitFields(t);
        const vals = [f[0] || 'NULL', f[1] || 'NULL'].concat(nowTuple());
        return makeTuple(vals);
      });
      out.push(rebuildInsert('DetailImages', ['imageId','speciesId','createdAt','updatedAt'], newTuples));
      continue;
    }

    // DetailSpecies
    let ds = ensureInsertWithColumns(sNoSemi, 'DetailSpecies', []);
    if (ds) {
      const newTuples = ds.tuples.map(t => {
        const f = splitFields(t);
        const base = [f[0] || 'NULL', f[1] || 'NULL', f[2] || 'NULL', f[3] || 'NULL'];
        const vals = base.concat(nowTuple());
        return makeTuple(vals);
      });
      out.push(rebuildInsert('DetailSpecies', ['speciesId','propertiesId','propertiesvalueId','value','createdAt','updatedAt'], newTuples));
      continue;
    }

    // Default: keep as-is
    out.push(sNoSemi.endsWith(';') ? sNoSemi : (sNoSemi + ';'));
  }

  return out;
}

try {
  const input = [safeRead(dlFilePath), safeRead(dl1FilePath)].filter(Boolean).join('\n\n');
  if (!input.trim()) {
    console.error('❌ No source data found in src/dl or src/dl1');
    process.exit(1);
  }

  const normalized = normalizeSourceText(input);
  const statements = splitStatements(normalized);
  const transformed = transformStatements(statements);

  // De-duplicate obvious duplicates by using INSERT IGNORE for selected tables
  const bodySql = transformed.map(s => {
    return s
      .replace(/^INSERT INTO `Properties`/i, 'INSERT IGNORE INTO `Properties`')
      .replace(/^INSERT INTO `PropertiesValues`/i, 'INSERT IGNORE INTO `PropertiesValues`')
      .replace(/^INSERT INTO `Images`/i, 'INSERT IGNORE INTO `Images`')
      .replace(/^INSERT INTO `DetailImages`/i, 'INSERT IGNORE INTO `DetailImages`')
      .replace(/^INSERT INTO `Species`/i, 'INSERT IGNORE INTO `Species`')
      .replace(/^INSERT INTO `DetailSpecies`/i, 'INSERT IGNORE INTO `DetailSpecies`')
      .replace(/^INSERT INTO `TypePropertys`/i, 'INSERT IGNORE INTO `TypePropertys`');
  }).join('\n\n');

  const header = [
    "SET NAMES utf8mb4;",
    "SET character_set_client = utf8mb4;",
    "SET character_set_connection = utf8mb4;",
    "SET character_set_results = utf8mb4;",
    "SET time_zone = '+07:00';"
  ].join('\n');

  const finalSql = header + '\n\n' + bodySql + '\n';

  fs.writeFileSync(outputFilePath, finalSql, 'utf8');
  console.log(`✅ Conversion complete. Clean SQL script saved to: ${outputFilePath}`);
} catch (error) {
  console.error('❌ An error occurred during data conversion:', error);
  process.exit(1);
}
