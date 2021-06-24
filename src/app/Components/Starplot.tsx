import React, {useEffect, useRef} from 'react';
import d3 from 'd3';
import {useSelector} from "react-redux";
import {getData} from "~store/data/data.selectors";

const Starplot = () => {
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
      .attr("x", 100)
      .attr("y", 75)
      .text("Starplot Gedönse " + data["2014"]["Haushalt mit 1 Person"].Haushaltsnettoeinkommen)

  }, [])

  return (
    <div>
      <svg viewBox="0 0 400 200" width="400" height="200" ref={ref}/>
    </div>
  );
};

export default Starplot;