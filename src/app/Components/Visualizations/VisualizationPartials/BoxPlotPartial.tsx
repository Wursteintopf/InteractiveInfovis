import React, { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { max, min, quantile } from 'd3-array'
import { path } from 'd3-path'

interface BoxPlotPartialProps {
  w: number
  h: number
  min: number
  max: number
  values: number[]
}

const BoxPlotPartial: React.FC<BoxPlotPartialProps> = (props) => {
  const spacingTopBottom = 20

  const x = useMemo(() => {
    return scaleLinear().domain([props.min, props.max]).range([0, props.w])
  }, [props.values])

  const minimum = x(min(props.values))
  const lowerQuantile = x(quantile(props.values, 0.25))
  const median = x(quantile(props.values, 0.5))
  const upperQuantile = x(quantile(props.values, 0.75))
  const maximum = x(max(props.values))

  const drawBoxplot = (context) => {
    context.moveTo(minimum, spacingTopBottom)
    context.lineTo(minimum, props.h - spacingTopBottom)

    context.moveTo(lowerQuantile, spacingTopBottom)
    context.lineTo(upperQuantile, spacingTopBottom)
    context.lineTo(upperQuantile, props.h - spacingTopBottom)
    context.lineTo(lowerQuantile, props.h - spacingTopBottom)
    context.lineTo(lowerQuantile, spacingTopBottom)

    context.moveTo(median, spacingTopBottom)
    context.lineTo(median, props.h - spacingTopBottom)

    context.moveTo(maximum, spacingTopBottom)
    context.lineTo(maximum, props.h - spacingTopBottom)

    context.moveTo(minimum, props.h / 2)
    context.lineTo(lowerQuantile, props.h / 2)

    context.moveTo(upperQuantile, props.h / 2)
    context.lineTo(maximum, props.h / 2)

    return context
  }

  return (
    <g>
      <path d={drawBoxplot(path())} fill='green' fillOpacity='20%' stroke='black' />
    </g>
  )
}

export default BoxPlotPartial
