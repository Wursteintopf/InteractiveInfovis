import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from "react-redux";
import {getData} from "~store/data/data.selectors";
import d3 from 'd3';
import rd3 from 'react-d3-library';

const RD3Component = rd3.Component;

interface state {
  d3: any
}

const Home: React.FC = () => {
  const ref = useRef()
  const data = useSelector(getData)

  useEffect(() => {
    const svgElement = d3.select(ref.current)
    svgElement.append("circle")
      .attr("cx", 150)
      .attr("cy", 70)
      .attr("r",  50)
      .attr("fill", "yellow")

    svgElement
      .append("text")
      .attr("x", 130)
      .attr("y", 75)
      .text(data["2014"]["Haushalt mit 1 Person"].Haushaltsnettoeinkommen)

  }, [])

  return (
    <div>
      <svg viewBox="0 0 1500 1500" ref={ref}/>
    </div>
  )
}

export default Home
