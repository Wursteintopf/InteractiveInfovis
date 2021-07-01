import React, { useMemo } from 'react'
import { Group } from './VisualizationInterfaces'
import { max, merge } from 'd3-array'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { convertAngleAndLengthToCoordinates } from '../../../util/MathUtil'

interface StarPlotProps {
  groups: Group[]
  size: number
  pad: number
}

const StarPlot:React.FC<StarPlotProps> = props => {
  const labels = props.groups.map(group => group.label)
  const chartSize = (props.size - (2 * props.pad))
  const radius = chartSize / 2
  const maxValue = max(merge(props.groups.map(group => [group.Haushaltsbruttoeinkommen, group.Haushaltsnettoeinkommen, group['Ausgabefaehige Einkommen und Einnahmen'], group['Private Konsumausgaben'], group['Andere Ausgaben']])))
  const axes = ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben']

  const scale = useMemo(() => {
    return scaleLinear().domain([0, maxValue]).range([0, radius])
  }, [props.groups])

  const scaleTicks = useMemo(() => {
    return scale.ticks(5)
  }, [props.groups])

  const tickOffset = radius / scaleTicks.length

  const color = useMemo(() => {
    return scaleOrdinal().domain(axes).range(['#e41a1c', '#377eb8', '#4daf4a', '#ff00ff', '#ffff00'])
  }, [])

  return (
    <svg viewBox={-props.size / 2 + ' ' + -props.size / 2 + ' ' + props.size + ' ' + props.size} width={props.size} height={props.size} style={{ padding: props.pad }}>
      {/** Axes **/}
      <g>
        {
          axes.map((axe, index) => {
            const coords = convertAngleAndLengthToCoordinates((360 / axes.length) * index, radius)

            return (
              <g key={index}>
                <path d={'M 0 0 L ' + coords[0] + ' ' + coords[1]} stroke='black' />
                <text transform={'translate(' + coords[0] + ',' + coords[1] + ')'} style={{ fontSize: 12 }} text-anchor="middle">{axe}</text>
              </g>
            )
          })
        }
        {
          scaleTicks.map((tick, index) => {
            const coordList = axes.map((axe, index2) => convertAngleAndLengthToCoordinates(360 / axes.length * index2, scale(tick)))
            let pathString = 'M '
            coordList.forEach(coord => {
              pathString += coord[0] + ' ' + coord[1] + ' L '
            })
            pathString += coordList[0][0] + ' ' + coordList[0][1]

            return <path key={index} d={pathString} stroke='grey' fill='none' />
          })
        }
      </g>
      {/** Values**/}
      <g>
        {props.groups.map((group, index) => {
          const coordList = axes.map((axe, index2) => convertAngleAndLengthToCoordinates(360 / axes.length * index2, scale(group[axe])))
          let pathString = 'M '
          coordList.forEach(coord => {
            pathString += coord[0] + ' ' + coord[1] + ' L '
          })
          pathString += coordList[0][0] + ' ' + coordList[0][1]

          return <path key={index} d={pathString} stroke={color(index)} fill='none' />
        })}
      </g>
    </svg>
  )
}

export default StarPlot
