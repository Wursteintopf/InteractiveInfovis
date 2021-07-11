import React from 'react'
import { Group } from '../../../store/data/data.interfaces'
import LineChartPartial from './VisualizationPartials/LineChartPartial'

interface LineChartProps {
  w: number
  h: number
  groups: Group[]
  pad: number
}

const LineChart: React.FC<LineChartProps> = (props) => {
  const spacingTop = 0
  const spacingLeft = 20
  const spacingRight = 220
  const spacingBottom = 20
  const boxWidth = props.w - 2 * props.pad

  const chartWidth = boxWidth - spacingRight - spacingLeft
  const chartHeight = props.h - 2 * props.pad - spacingTop - spacingBottom

  const unwantedKeys = ['label', 'Differenz zu Brutto', 'Sonstige Einnahmen', 'Erfasste Haushalte']

  const segmentHeight = chartHeight / Object.keys(props.groups[0]).filter(e => !unwantedKeys.includes(e)).length

  const xOffset = chartWidth / (props.groups.length - 1)

  return (
    <svg width={props.w} height={props.h} style={{ padding: props.pad }}>
      {/** Draw Segments **/}
      <g transform={'translate(' + spacingLeft + ',' + spacingTop + ')'}>
        {
          Object.keys(props.groups[0]).filter(e => !unwantedKeys.includes(e)).map((key, index) => {
            return (
              <g key={index} transform={'translate(0,' + index * segmentHeight + ')'}>
                <LineChartPartial w={chartWidth} h={chartHeight / Object.keys(props.groups[0]).filter(e => !unwantedKeys.includes(e)).length} values={props.groups.map(group => group[key])} />
                <text style={{ fontSize: 11 }} transform={'translate(' + (chartWidth + 10) + ',30)'}>{key}</text>
              </g>
            )
          })
        }
      </g>
      {/** Footer **/}
      <g transform={'translate(' + spacingLeft + ',' + (spacingTop + chartHeight) + ')'}>
        {
          props.groups.map((group, index) => <text key={index} style={{ fontSize: 12 }} transform={'translate(' + (index * xOffset) + ',20)'} textAnchor='middle'>{group.label}</text>)
        }
      </g>
    </svg>
  )
}

export default LineChart
