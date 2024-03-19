import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { cluster, hierarchy } from 'd3-hierarchy';
import { linkVertical } from 'd3-shape';
import { IoIosEye } from 'react-icons/io';

const Dendrogram = ({ linkage }) => {
  const svgRef = useRef();
  const [selectedNode, setSelectedNode] = useState(null);
  const [showAllAttributes, setShowAllAttributes] = useState(false);

  useEffect(() => {
    if (!linkage) return;

    const width = 600;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(40,40)');

    const root = hierarchy(linkage.children[0]);
    const nodes = cluster().size([height - 100, width - 160])(root);
    const links = nodes.links();

    const lineGenerator = d3.line()
      .curve(d3.curveCardinal);

    const link = svg.selectAll('.link')
      .data(links)
      .enter().append('path')
      .attr('class', 'link')
      .attr('d', d => lineGenerator([[d.source.x, d.source.y], [d.target.x, d.target.y]]))
      .style('fill', 'none')
      .style('stroke', '#555')
      .style('stroke-width', '2px')
      .style('opacity', '0.7');

    const node = svg.selectAll('.node')
      .data(nodes.descendants())
      .enter().append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${d.x},${d.y})`)
      .on('click', function (d) {
        setSelectedNode(d.data.name === selectedNode ? null : d.data.name);
        setShowAllAttributes(false);
      });

    node.append('circle')
      .attr('r', 20)
      .style('fill', d => d.children ? '#4daf4a' : '#377eb8')
      .style('stroke', '#fff')
      .style('stroke-width', '2px');

    node.append('text')
      .attr('dy', 6)
      .style('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', d => {
        if (showAllAttributes) {
          return '#000'; // Hiển thị tất cả các thuộc tính nếu showAllAttributes được kích hoạt
        } else {
          return (selectedNode === d.data.name || !d.children) ? '#000' : 'none';
        }
      })
      .text(d => d.data.name);

  }, [linkage, selectedNode, showAllAttributes]);

  const handleShowAllAttributes = () => {
    setShowAllAttributes(!showAllAttributes);
  };

 return (
    <div>
      {/* <button 
        onClick={handleShowAllAttributes}
        className="px-4 py-2 bottom-0 top-0  bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 hover:shadow-lg transition duration-300 ease-in-out"
     
      >
        <IoIosEye className="inline-block " /> 
       
      </button> */}

      <svg ref={svgRef}></svg>
    </div>
  );
};

export default Dendrogram;