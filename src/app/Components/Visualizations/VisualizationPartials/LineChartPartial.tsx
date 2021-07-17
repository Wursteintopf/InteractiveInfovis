import React, { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { min, max } from 'd3-array'
import { path } from 'd3-path'
import { getColorByKey, getMutedColorByKey } from '../../../../style/theme'
import { useSelector } from 'react-redux'
import { getHighlightedAttributes, getZoom } from '../../../../store/ui/ui.selectors'
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
  const zoom = useSelector(getZoom)

  let [minVal, maxVal] = [min(props.values) < zoom[0] ? zoom[0] : min(props.values), max(props.values) > zoom[1] ? zoom[1] : max(props.values)]
  if (zoom[0] > max(props.values) || zoom[1] < min(props.values)) {
    minVal = 0
    maxVal = 0
  }

  const scale = useMemo(() => {
    return scaleLinear().domain([minVal, maxVal]).range([boxHeight, 0])
  }, [props.values, zoom])

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
    if (minVal !== 0 || maxVal !== 0) {
      props.values.forEach((value, index) => {
        if (index === 0) context.moveTo(0, scale(value) < 0 ? 0 : scale(value) > boxHeight ? boxHeight : scale(value))
        else context.lineTo(xOffset * index, scale(value) < 0 ? 0 : scale(value) > boxHeight ? boxHeight : scale(value))
      })

      return context
    }
  }

  const buildAxe = () => {
    const y1 = scale(max(props.values)) < 0 ? null : scale(max(props.values)) + 12
    const y2 = scale(min(props.values)) > boxHeight ? null : scale(min(props.values))

    const upperVal = (
      <g transform={`translate(${props.w + 10},${scale(max(props.values)) + 12})`}>
        <text fontSize={12}>{Math.floor(max(props.values))}€</text>
      </g>
    )

    const lowerVal = (
      <g transform={`translate(${props.w + 10},${scale(min(props.values))})`}>
        <text fontSize={12}>{Math.floor(min(props.values))}€</text>
      </g>
    )

    if (minVal !== 0 || maxVal !== 0) {
      return (
        <g>
          {y1 ? upperVal : ''}
          {y2 ? lowerVal : ''}
        </g>
      )
    }
  }

  const renderDetails = () => {
    if (highlighted.includes(getAttributeFromString(props.label)) && zoom[0] !== zoom[1] && (minVal !== 0 || maxVal !== 0)) {
      return (
        <g>
          {
            props.values.map((value, index) => {
              const y = index === 0 ? scale(value) : scale(value) + 12

              if (y < props.h && y > 0) {
                return <text key={index} transform={`translate(${index === 0 ? 30 : xOffset * index},${y})`} fontSize={12} textAnchor='end'>{Math.floor(value)}</text>
              }
            })
          }
        </g>
      )
    }
  }

  return (
    <g>
      <path d={grid(path())} fill='none' stroke='lightgrey' />
      <path d={line(path())} fill='none' stroke={color(getAttributeFromString(props.label))} strokeWidth={2} />
      {buildAxe()}
      {renderDetails()}
    </g>
  )
}

export default LineChartPartial
