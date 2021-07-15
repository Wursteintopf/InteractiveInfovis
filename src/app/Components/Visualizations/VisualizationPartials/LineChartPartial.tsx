import React, { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { min, max } from 'd3-array'
import { path } from 'd3-path'
import { getColorByKey, getMutedColorByKey } from '../../../../style/theme'
import { useSelector } from 'react-redux'
import { getHighlightedAttributes } from '../../../../store/ui/ui.selectors'
import { attribute } from '../../../../store/ui/ui.interfaces'
import { getAttributeFromString } from '../../../../util/DataUtil'

interface LineChartPartialProps {
  w: number
  h: number
  label: string
  values: number[]
}

const LineChartPartial: React.FC<LineChartPartialProps> = (props) => {
  const boxHeight = props.h - 10
  const highlighted = useSelector(getHighlightedAttributes)

  const scale = useMemo(() => {
    return scaleLinear().domain([min(props.values), max(props.values)]).range([boxHeight, 0])
  }, [props.values])

  const color = (key: attribute) => {
    if (highlighted.includes(key) || highlighted.length === 0) return getColorByKey(key)
    else return getMutedColorByKey(key)
  }
  
  const xOffset = props.w / (props.values.length - 1)

  const grid = (context) => {
    context.moveTo(0, 0)
    context.lineTo(props.w, 0)
    context.lineTo(props.w, boxHeight)
    context.lineTo(0, boxHeight)
    context.lineTo(0, 0)

    props.values.forEach((value, index) => {
      if (index !== 0 && index !== props.values.length - 1) {
        context.moveTo(xOffset * index, 0)
        context.lineTo(xOffset * index, boxHeight)
      }
    })

    return context
  }

  const line = (context) => {
    props.values.forEach((value, index) => {
      if (index === 0) context.moveTo(0, scale(value))
      else context.lineTo(xOffset * index, scale(value))
    })

    return context
  }

  const buildAxe = () => {
    return (
      <g>
        <g transform={`translate(${props.w + 10},${scale(max(props.values)) + 12})`}>
          <text fontSize={12}>{Math.floor(max(props.values))}€</text>
        </g>
        <g transform={`translate(${props.w + 10},${scale(min(props.values))})`}>
          <text fontSize={12}>{Math.floor(min(props.values))}€</text>
        </g>
      </g>
    )
  }

  return (
    <g>
      <path d={grid(path())} fill='none' stroke='lightgrey' />
      <path d={line(path())} fill='none' stroke={color(getAttributeFromString(props.label))} strokeWidth={2} />
      {buildAxe()}
    </g>
  )
}

export default LineChartPartial
