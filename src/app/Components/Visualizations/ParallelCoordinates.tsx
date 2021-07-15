import React, { useMemo } from 'react'
import { max, merge } from 'd3-array'
import { Group } from '../../../store/data/data.interfaces'
import { path } from 'd3-path'
import { scaleLinear, scaleOrdinal } from 'd3-scale'

interface ParallelCoordinatesProps {
    groups: Group[]
    w: number
    h: number
    pad: number
}

const ParallelCoordinates: React.FC<ParallelCoordinatesProps> = (props) => {
  const spacingLeft = 30
  const spacingBottom = 30
  const spacingRight = 50
  const chartWidth = (props.w - (2 * props.pad) - spacingLeft - spacingRight)
  const chartHeight = (props.h - (2 * props.pad) - spacingBottom)
  const maxValue = max(merge(props.groups.map(group => [group.Haushaltsbruttoeinkommen, group.Haushaltsnettoeinkommen, group['Ausgabefaehige Einkommen und Einnahmen'], group['Private Konsumausgaben'], group['Andere Ausgaben']])))
  const axes = ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben']

  const y = useMemo(() => {
    return scaleLinear().domain([0, maxValue]).range([chartHeight, 0])
  }, [props.groups])

  const yTicks = useMemo(() => {
    return y.ticks()
  }, [props.groups])

  const color = useMemo(() => {
    return scaleOrdinal().domain(axes).range(['#1487C2', '#28BCCA', '#C9D93B', '#FEA82A', '#D08AC0'])
  }, [])

  const xOffSet = chartWidth / (axes.length - 1)

  return (

    <svg width={props.w} height={props.h} style={{ padding: props.pad }}>
      {/** Values**/}
      <g>
        {
          props.groups.map((group, index) => {
            const line = (context) => {
              axes.forEach((axe, index) => {
                if (index === 0) {
                  context.moveTo(index * xOffSet + spacingLeft, y(group[axe]))
                } else {
                  context.lineTo(index * xOffSet + spacingLeft, y(group[axe]))
                }
              })
              return context
            }

            return <path key={index} d={line(path())} fill='none' stroke={color(index)} strokeWidth={2} />
          })

        }
      </g>
      {/** Y Axis **/}
      <g>
        {
          axes.map((axe, index) => {
            return (
              <g key={index}>
                <path d={'M ' + (index * xOffSet + spacingLeft) + ' 0 L ' + (index * xOffSet + spacingLeft) + ' ' + chartHeight} stroke='darkgrey' />
              </g>
            )
          })
        }
      </g>
      {/** Labels **/}
      <g>
        {
                    
          axes.map((axe, index) => {
            return (
              <g key={index} transform={'translate(' + (index * xOffSet + spacingLeft - 5) + ',' + (chartHeight) + ')rotate(270)'} style={{ fontSize: 11 }}>
                <text>{axe}</text>
              </g>
            )
          })
        }
      </g>
      {/** Ticks **/}
      <g transform={`translate(${chartWidth + spacingLeft},0)`}>
        {
          yTicks.map(tick => {
            return (
              <g key={tick} transform={`translate(0,${y(tick)})`}>
                <line x2={7} stroke='darkgrey' />
                <text transform='translate(10,5)' fontSize={12}>{tick}€</text>
              </g>
            )
          })
        }
      </g>
    </svg>

  )
}

export default ParallelCoordinates
