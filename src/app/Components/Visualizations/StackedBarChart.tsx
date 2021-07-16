import React, { useMemo } from 'react'
import { scaleLinear } from 'd3-scale'
import { max, merge } from 'd3-array'
import { useSelector } from 'react-redux'
import { getStackedExpenditureData, getStackedIncomeData } from '../../../store/data/data.selectors'
import { Group } from '../../../store/data/data.interfaces'
import { getColorByKey, getMutedColorByKey } from '../../../style/theme'
import { getHighlightedAttributes, getZoom } from '../../../store/ui/ui.selectors'
import { attribute } from '../../../store/ui/ui.interfaces'
import { getAttributeFromString } from '../../../util/DataUtil'

interface StackedBarChartProps {
  groups: Group[]
  w: number
  h: number
  pad: number
}

const StackedBarChart: React.FC<StackedBarChartProps> = props => {
  const highlighted = useSelector(getHighlightedAttributes)
  const zoom = useSelector(getZoom)

  const color = (key: attribute) => {
    if (highlighted.includes(key) || highlighted.length === 0) return getColorByKey(key)
    else return getMutedColorByKey(key)
  }

  const labels = props.groups.map(group => group.label)

  const spacingLeft = 45
  const spacingBottom = 50
  const chartWidth = (props.w - (2 * props.pad) - spacingLeft)
  const chartHeight = (props.h - (2 * props.pad) - spacingBottom)

  const y = useMemo(() => {
    return scaleLinear().domain(zoom).range([0, chartHeight])
  }, [props.groups, zoom])

  const yTicks = useMemo(() => {
    return y.ticks(5)
  }, [props.groups, zoom])

  const xOffSet = chartWidth / labels.length

  const stackedIncome = useSelector(getStackedIncomeData)
  const stackedExpenditure = useSelector(getStackedExpenditureData)

  const details = (rect, key, xPos) => {
    if (highlighted.includes(getAttributeFromString(key))) {
      return (
        <g transform={`translate(${xPos},0)`} fill='black'>
          <text transform={`translate(2,${chartHeight - y(rect[1]) + 14})`} fontSize={12}>{Math.floor(rect[1])}</text>
        </g>
      )
    }
  }

  return (
    <svg width={props.w} height={props.h} style={{ padding: props.pad }}>
      {/** Income **/}
      {
        stackedIncome.map((type, index) => {
          return (
            <g key={index} fill={color(getAttributeFromString(type.key))}>
              {
                type.map((rect, index) => {
                  const height = y(rect[1]) - y(rect[0])
                  const yPos = chartHeight - height - y(rect[0])
                  const xPos = spacingLeft + (index * xOffSet)

                  return (
                    <g key={index}>
                      <rect x={xPos} y={yPos} height={height} width={32} />
                      {details(rect, type.key, xPos)}
                    </g>
                  )
                })
              }
            </g>
          )
        })
      }
      {/** Expenditure **/}
      {
        stackedExpenditure.map((type, index) => {
          return (
            <g key={index} fill={color(getAttributeFromString(type.key))}>
              {
                type.map((rect, index) => {
                  const height = y(rect[1]) - y(rect[0])
                  const yPos = chartHeight - height - y(rect[0])
                  const xPos = spacingLeft + 40 + (index * xOffSet)

                  return (
                    <g key={index}>
                      <rect key={index} x={xPos} y={yPos} height={height} width={32} />
                      {details(rect, type.key, xPos)}
                    </g>
                  )
                })
              }
            </g>
          )
        })
      }
      {/** Y Axis **/}
      <g>
        <path d={'M ' + spacingLeft + ' 0 V ' + chartHeight} stroke='darkgrey' />
        {
          yTicks.map((tick, index) => {
            return (
              <g key={index} transform={'translate(' + (spacingLeft - 7) + ',' + (chartHeight - y(tick)) + ')'}>
                <text transform='translate(-39,5)' style={{ fontSize: 12 }}>{tick}€</text>
                <line x2='7' stroke='darkgrey' />
              </g>
            )
          })
        }
      </g>
      {/** X Axis **/}
      <g>
        <rect x={spacingLeft} y={chartHeight} width={chartWidth} height={spacingBottom + 1} fill='white' />
        <path d={'M ' + spacingLeft + ' ' + chartHeight + 'H ' + (chartWidth + spacingLeft)} stroke='darkgrey' />
        {
          labels.map((label, index) => {
            return (
              <g key={index} transform={'translate(' + (spacingLeft + index * xOffSet) + ',' + (chartHeight + 20) + ')'}>
                <text style={{ fontSize: 12 }}>{label}</text>
              </g>
            )
          })
        }
      </g>
    </svg>
  )
}

export default StackedBarChart
