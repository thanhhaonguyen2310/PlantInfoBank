function distance(sample1, sample2) {
  let dist = 0;
  for (let i = 0; i < sample1.length; i++) {
    if (sample1[i] !== sample2[i]) {
      dist++;
    }
  }
  return dist;
}

export const distanceMatrix = (dataArray) => {
  try {
    const data = dataArray.map((sample) => Object.values(sample));
    const nSamples = data.length;

    console.log(data);
    let distanceMatrix = [];

    // Tính ma trận khoảng cách
    for (let i = 0; i < nSamples; i++) {
      distanceMatrix.push([]);
      for (let j = 0; j < nSamples; j++) {
        distanceMatrix[i][j] = distance(data[i], data[j]);
      }
    }
    console.log(distanceMatrix)
    // Tính ma trận khoảng cách trong quá trình hierarchical clustering

    while (distanceMatrix.length > 1) {
      // Tìm cặp mẫu có khoảng cách nhỏ nhất

      let minDistance = Infinity;
      let minI, minJ;
      for (let i = 0; i < distanceMatrix.length; i++) {
        for (let j = i + 1; j < distanceMatrix.length; j++) {
          if (distanceMatrix[i][j] < minDistance) {
            minDistance = distanceMatrix[i][j];
            minI = i;
            minJ = j;
          }
        }
      }

      // Gộp hai mẫu có khoảng cách nhỏ nhất vào một cụm mới
      const mergedCluster = [];
      for (let k = 0; k < data[0].length; k++) {
        const value1 = data[minI][k];
        const value2 = data[minJ][k];
        mergedCluster[k] = value1 === value2 ? value1 : -1; // Gán -1 nếu giá trị khác nhau
      }

      // Ghi lại quá trình gộp
      console.log(`Gộp mẫu ${minI} và ${minJ} thành cụm mới:`, mergedCluster);

      // Xóa hai hàng và cột tương ứng từ ma trận khoảng cách
      distanceMatrix.splice(minJ, 1);
      for (let i = 0; i < distanceMatrix.length; i++) {
        distanceMatrix[i].splice(minJ, 1);
      }

      distanceMatrix.splice(minI, 1);
      for (let i = 0; i < distanceMatrix.length; i++) {
        distanceMatrix[i].splice(minI, 1);
      }

      // Tính lại khoảng cách từ cụm mới đến các cụm còn lại
      const newDistances = [];
      for (let i = 0; i < distanceMatrix.length; i++) {
        const dist = distance(mergedCluster, data[i]);
        newDistances.push(dist);
        distanceMatrix[i].push(dist);
      }
      newDistances.push(0); // Khoảng cách từ một cụm đến chính nó là 0
      console.log(newDistances);
      distanceMatrix.push(newDistances);
    }
    // console.log(data);
    console.log(distanceMatrix);
    return distanceMatrix;
  } catch (error) {
    console.log(error);
  }
};
