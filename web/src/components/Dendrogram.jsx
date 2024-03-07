import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { cluster, hierarchy } from 'd3-hierarchy';
import { linkVertical,linkHorizontal } from 'd3-shape';

const Dendrogram = ( linkage ) => {
  const svgRef = useRef();
  // console.log(data)
  const data = linkage.linkage.children[0]
  console.log(data)
  useEffect(() => {
    const width = 700;
    const height = 700;

    const svg = d3.select(svgRef.current)
      .attr('width', 'auto')
      .style('margin', '0 auto')
      .attr('height', height)
      .append('g')
      // .attr('transform', 'translate(40,0)');
    svg.selectAll(".node circle")
      .style("fill", "#fff")
      .style("stroke", "steelblue")
      .style("stroke-width", "1px")
      // .style("font", "15px sans-serif");
    svg.selectAll(".node")
      .style("font", "15px sans-serif");
      
  
    svg.selectAll(".link")
      .style("fill", "none")
      .style("stroke", "#ccc")
      .style("stroke-width", "1px");
  
    const root = hierarchy(data);
    const nodes = cluster().size([height-160, width -160])(root);
    const links = nodes.links();

    const link = svg.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', linkVertical()
        .x(d => d.x)
        .y(d => d.y)
      );

    const node = svg.selectAll('.node')
      .data(nodes.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`);

    node.append('circle')
      .attr('r', 1);

    node.append('text')
      .attr('dx', d => (d.children ? -20 : 20))
      .attr('dy', 15)
      .style('text-anchor', d => (d.children ? 'end' : 'start'))
      .text(d => d.data.name);
  }, [data]);

  return <svg ref={svgRef} ></svg>;
};

export default Dendrogram;
