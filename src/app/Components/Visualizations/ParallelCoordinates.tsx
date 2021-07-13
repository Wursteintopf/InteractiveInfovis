import React, { useMemo } from 'react'
import { max, merge } from 'd3-array'
import { useSelector } from 'react-redux'
import { Group } from '../../../store/data/data.interfaces'
import { path } from 'd3-path'
import { getColorByKey } from '../../../style/theme'
import { Group } from '@material-ui/icons'
import { scaleLinear, scaleOrdinal } from 'd3-scale'

interface ParallelCoordinatesProps {
    groups: Group[]
    w: number
    h: number
    pad: number
}

const ParallelCoordinates: React.FC<ParallelCoordinatesProps> = (props) => {
  const spacingLeft = 70
  const spacingBottom = 70
  const chartWidth = (props.w - (2 * props.pad) - spacingLeft)
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

  const xOffSet = chartWidth / axes.length
  const yOffSet = chartHeight / yTicks.length

  return (

    <svg width={props.w} height={props.h} style={{ padding: props.pad }}>
      {/** Y Axis **/}
      <g>
        {
          axes.map((axe, index) => {
            return (
              <g key={index}>
                <path d={'M ' + ((index + 1) * xOffSet) + ' 0 L ' + ((index + 1) * xOffSet) + ' ' + chartHeight} stroke='black' />
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
              <g key={index} transform={'translate(' + (spacingLeft + index * xOffSet) + ',' + (chartHeight + 20) + ')rotate(15)'} style={{ fontSize: 9 }}>
                <text>{axe}</text>
              </g>
            )
          })
        }
      </g>
      {/** Values**/}
      <g>
        {
          props.groups.map((group, index) => {
            const line = (context) => {
              axes.forEach((axe, index) => {
                if (index === 0) {
                  context.moveTo((index + 1) * xOffSet, y(group[axe]))
                } else {
                  context.lineTo((index + 1) * xOffSet, y(group[axe]))
                }
              })
              return context
            }

            return <path key={index} d={line(path())} fill='none' stroke={color(index)} strokeWidth={1} />
          })
                
        }
      </g>
    </svg>

  )
}

export default ParallelCoordinates
