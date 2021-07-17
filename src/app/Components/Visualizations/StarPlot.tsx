import React, { useMemo } from 'react'
import { min, max, merge } from 'd3-array'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { convertAngleAndLengthToCoordinates } from '../../../util/MathUtil'
import { Group } from '../../../store/data/data.interfaces'
import { useSelector } from 'react-redux'
import { getZoom } from '../../../store/ui/ui.selectors'

interface StarPlotProps {
  groups: Group[]
  w: number
  size: number
  pad: number
}

const StarPlot:React.FC<StarPlotProps> = props => {
  const zoom = useSelector(getZoom)
  const labels = props.groups.map(group => group.label)
  const chartSize = (props.size - (2 * props.pad))
  const radius = chartSize / 2
  const maxValue = max(merge(props.groups.map(group => [group.Haushaltsbruttoeinkommen, group.Haushaltsnettoeinkommen, group['Ausgabefaehige Einkommen und Einnahmen'], group['Private Konsumausgaben'], group['Andere Ausgaben']])))
  const minValue = min(merge(props.groups.map(group => [group.Haushaltsbruttoeinkommen, group.Haushaltsnettoeinkommen, group['Ausgabefaehige Einkommen und Einnahmen'], group['Private Konsumausgaben'], group['Andere Ausgaben']])))
  const axes = ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben']

  const scale = useMemo(() => {
    return scaleLinear().domain([minValue > zoom[0] ? minValue : zoom[0], maxValue < zoom[1] ? maxValue : zoom[1]]).range([0, radius])
  }, [props.groups])

  const scaleTicks = useMemo(() => {
    return scale.ticks(4)
  }, [props.groups])

  const tickOffset = radius / scaleTicks.length

  const color = useMemo(() => {
    return scaleOrdinal().domain(axes).range(['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c'])
  }, [])

  return (
    <svg viewBox={-props.w / 2 + ' ' + -props.size / 2 + ' ' + props.w + ' ' + props.size} width={props.w} height={props.size} style={{ padding: props.pad }}>
      {/** Axes **/}
      <g>
        {
          axes.map((axe, index) => {
            const coords = convertAngleAndLengthToCoordinates((360 / axes.length) * index, radius)

            return (
              <g key={index}>
                <path d={'M 0 0 L ' + coords[0] + ' ' + coords[1]} stroke='lightgrey' />
                <text transform={'translate(' + coords[0] + ',' + coords[1] + ')'} style={{ fontSize: 12 }} textAnchor='middle'>{axe}</text>
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

            return <path key={index} d={pathString} stroke='lightgrey' fill='none' />
          })
        }
      </g>
      {/** Values**/}
      <g>
        {props.groups.map((group, index) => {
          const coordList = axes.map((axe, index2) => convertAngleAndLengthToCoordinates(360 / axes.length * index2, scale(group[axe]) <= 0 ? 0 : scale(group[axe])))
          let pathString = 'M '
          coordList.forEach(coord => {
            pathString += coord[0] + ' ' + coord[1] + ' L '
          })
          pathString += coordList[0][0] + ' ' + coordList[0][1]

          return <path key={index} d={pathString} stroke={color(index)} strokeWidth={2} fill={color(index)} fillOpacity='20%' />
        })}
      </g>
    </svg>
  )
}

export default StarPlot
