import React, { useMemo } from 'react'
import { max, merge } from 'd3-array'
import { Group } from '../../../store/data/data.interfaces'
import { path } from 'd3-path'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { useSelector } from 'react-redux'
import { getHighlightedAttributes, getZoom } from '../../../store/ui/ui.selectors'
import { getAttributeFromString } from '../../../util/DataUtil'

interface ParallelCoordinatesProps {
    groups: Group[]
    w: number
    h: number
    pad: number
}

const ParallelCoordinates: React.FC<ParallelCoordinatesProps> = (props) => {
  const highlights = useSelector(getHighlightedAttributes)
  const zoom = useSelector(getZoom)

  const spacingLeft = 30
  const spacingBottom = 10
  const spacingRight = 50
  const chartWidth = (props.w - (2 * props.pad) - spacingLeft - spacingRight)
  const chartHeight = (props.h - (2 * props.pad) - spacingBottom)
  const maxValue = max(merge(props.groups.map(group => [group.Haushaltsbruttoeinkommen, group.Haushaltsnettoeinkommen, group['Ausgabefaehige Einkommen und Einnahmen'], group['Private Konsumausgaben'], group['Andere Ausgaben']])))
  const axes = ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben']

  const y = useMemo(() => {
    return scaleLinear().domain(zoom).range([chartHeight, 0])
  }, [props.groups, zoom])

  const yTicks = useMemo(() => {
    return y.ticks()
  }, [props.groups])

  const color = useMemo(() => {
    return scaleOrdinal().domain(axes).range(['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c'])
  }, [])

  const xOffSet = chartWidth / (axes.length - 1)

  const renderDetails = () => {
    return (
      <g>
        {
          props.groups.map(group => {
            return axes.map((axe, index) => {
              if (highlights.includes(getAttributeFromString(axe))) {
                return (
                  <text transform={`translate(${index * xOffSet},${y(group[axe]) + 10})`} fontSize={12}>{group[axe]}</text>
                )
              }
            })
          })
        }
      </g>
    )
  }

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
                <text fill={highlights.includes(getAttributeFromString(axe)) ? 'lightgrey' : 'black'}>{axe}</text>
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
      {/** Details **/}
      {renderDetails()}
    </svg>
  )
}

export default ParallelCoordinates
