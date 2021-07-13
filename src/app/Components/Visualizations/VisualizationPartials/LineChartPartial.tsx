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
  const highlighted = useSelector(getHighlightedAttributes)

  const scale = useMemo(() => {
    return scaleLinear().domain([min(props.values), max(props.values)]).range([props.h, 0])
  }, [props.values])

  const color = (key: attribute) => {
    if (highlighted.includes(key) || highlighted.length === 0) return getColorByKey(key)
    else return getMutedColorByKey(key)
  }
  
  const xOffset = props.w / (props.values.length - 1)

  const grid = (context) => {
    context.moveTo(0, 0)
    context.lineTo(props.w, 0)
    context.lineTo(props.w, props.h)
    context.lineTo(0, props.h)
    context.lineTo(0, 0)

    props.values.forEach((value, index) => {
      if (index !== 0 && index !== props.values.length - 1) {
        context.moveTo(xOffset * index, 0)
        context.lineTo(xOffset * index, props.h)
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

  return (
    <g>
      <path d={grid(path())} fill='none' stroke='lightgrey' />
      <path d={line(path())} fill='none' stroke={color(getAttributeFromString(props.label))} strokeWidth={2} />
    </g>
  )
}

export default LineChartPartial
