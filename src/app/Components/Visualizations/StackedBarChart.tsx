import React, { useMemo, useRef } from 'react'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { stack } from 'd3-shape'
import { max, merge } from 'd3-array'
import { Group } from './VisualizationInterfaces'

interface StackedBarChartProps {
  groups: Group[]
  w: number
  h: number
  pad: number
}

const StackedBarChart: React.FC<StackedBarChartProps> = props => {
  const incomeKeys = ['Haushaltsnettoeinkommen', 'Differenz zu Brutto', 'Sonstige Einnahmen']
  const expenditureKeys = ['Private Konsumausgaben', 'Andere Ausgaben']
  const labels = props.groups.map(group => group.label)

  const spacingLeft = 45
  const spacingBottom = 50
  const chartWidth = (props.w - (2 * props.pad) - spacingLeft)
  const chartHeight = (props.h - (2 * props.pad) - spacingBottom)
  const maxValue = max(merge(props.groups.map(group => [group.Haushaltsnettoeinkommen + group['Differenz zu Brutto'] + group['Sonstige Einnahmen'], group['Private Konsumausgaben'] + group['Andere Ausgaben']])))

  const y = useMemo(() => {
    return scaleLinear().domain([0, maxValue]).range([0, chartHeight])
  }, [props.groups])

  const yTicks = useMemo(() => {
    return y.ticks()
  }, [props.groups])

  const xOffSet = chartWidth / labels.length
  const yOffSet = chartHeight / yTicks.length

  const stackedIncome = useMemo(() => {
    return stack().keys(incomeKeys)(props.groups)
  }, [props.groups])

  const stackedExpenditure = useMemo(() => {
    return stack().keys(expenditureKeys)(props.groups)
  }, [props.groups])

  const color = useMemo(() => {
    return scaleOrdinal().domain(labels).range(['#e41a1c', '#377eb8', '#4daf4a'])
  }, [])

  return (
    <svg width={props.w} height={props.h} style={{ padding: props.pad }}>
      {/** Y Axis **/}
      <g>
        <path d={'M ' + spacingLeft + ' 0 V ' + chartHeight} stroke='black' />
        {
          yTicks.reverse().map((tick, index) => {
            return (
              <g key={index} transform={'translate(' + (spacingLeft - 7) + ',' + (index + 1) * yOffSet + ')'}>
                <text transform='translate(-38,5)'>{tick}</text>
                <line x2='7' stroke='black' />
              </g>
            )
          })
        }
      </g>
      {/** X Axis **/}
      <g>
        <path d={'M ' + spacingLeft + ' ' + chartHeight + 'H ' + (chartWidth + spacingLeft)} stroke='black' />
        {
          labels.map((label, index) => {
            return (
              <g key={index} transform={'translate(' + (spacingLeft + index * xOffSet) + ',' + (chartHeight + 20) + ')'}>
                <text>{label}</text>
              </g>
            )
          })
        }
      </g>
      {/** Income **/}
      {
        stackedIncome.map((type, index) => {
          return (
            <g key={index} fill={color(index)}>
              {
                type.map((rect, index) => {
                  const height = y(rect[1]) - y(rect[0])
                  const yPos = chartHeight - height - y(rect[0])

                  return <rect key={index} x={spacingLeft + (index * xOffSet)} y={yPos} height={height} width={30} />
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
            <g key={index} fill={color(index)}>
              {
                type.map((rect, index) => {
                  const height = y(rect[1]) - y(rect[0])
                  const yPos = chartHeight - height - y(rect[0])

                  return <rect key={index} x={spacingLeft + 40 + (index * xOffSet)} y={yPos} height={height} width={30} />
                })
              }
            </g>
          )
        })
      }
    </svg>
  )
}

export default StackedBarChart
