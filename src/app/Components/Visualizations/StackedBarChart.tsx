import React, { useEffect, useRef } from 'react'
import { scaleBand, scaleLinear, scaleOrdinal } from 'd3-scale'
import { select } from 'd3-selection'
import { axisBottom, axisLeft } from 'd3-axis'
import { stack } from 'd3-shape'

interface Income {
  'Haushaltsbruttoeinkommen': number
  'Haushaltsnettoeinkommen': number
  'Ausgabefaehige Einkommen und Einnahmen': number
}

interface Expenditure {
  'Private Konsumausgaben': number
  'Andere Ausgaben': number
}

interface Group {
  label: string
  income: Income
  expenditure: Expenditure
}

interface StackedBarChartProps {
  groups: Group[]
}

const StackedBarChart: React.FC<StackedBarChartProps> = props => {
  const ref = useRef()

  useEffect(() => {
    const svg = select(ref.current)
    
    const subgroups = Object.keys(props.groups[0].income)

    const labels = props.groups.map(group => group.label)

    const x = scaleBand()
      .domain(labels)
      .range([0, 300])
      .padding([0.2])
    svg.append('g')
      .attr('transform', 'translate(0,' + 300 + ')')
      .call(axisBottom(x).tickSizeOuter(0))

    const y = scaleLinear()
      .domain([0, 60])
      .range([300, 0])
    svg.append('g')
      .call(axisLeft(y))

    const color = scaleOrdinal()
      .domain(subgroups)
      .range(['#e41a1c', '#377eb8', '#4daf4a'])

    // const stackedData = stack().keys(subgroups)(props.groups[0].income)
    //
    // svg.append('g')
    //   .selectAll('g')
    //   .data(stackedData)
    //   .enter().append('g')
    //   .attr('fill', function (d) { return color(d.key) })
    //   .selectAll('rect')
    //   .data(function (d) { return d })
    //   .enter().append('rect')
    //   .attr('x', function (d) { return x(d.data.group) })
    //   .attr('y', function (d) { return y(d[1]) })
    //   .attr('height', function (d) { return y(d[0]) - y(d[1]) })
    //   .attr('width', x.bandwidth())
  }, [])

  return (
    <div style={{ padding: 10 }}>
      <svg viewBox='0 0 400 400' width='400' height='400' ref={ref} />
    </div>
  )
}

export default StackedBarChart
