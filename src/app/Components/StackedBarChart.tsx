import React, {useEffect, useRef} from 'react';
import {useSelector} from "react-redux";
import {getData} from "~store/data/data.selectors";
import * as d3 from 'd3';
import {scaleLinear} from "d3-scale";
import {axisBottom} from "d3-axis";

const StackedBarChart = () => {
  const ref = useRef()
  const data = useSelector(getData)

  useEffect(() => {
    const svg = d3.select(ref.current)

    d3.json("../../../data/data.json", () => {
      let groups = d3.map(data, function(d){return(d.group)}).keys()

      // Add X axis
      let x = scaleLinear()
        .domain(groups)
        .range([0, 300])

      svg.append("g")
        .attr("transform", "translate(0," + 100 + ")")
        .call(axisBottom().tickSizeOuter(0).scale(x));
    })
  }, [])

  return (
    <div>
      <svg viewBox="0 0 400 200" width="400" height="200" ref={ref}/>
    </div>
  );
};

export default StackedBarChart;