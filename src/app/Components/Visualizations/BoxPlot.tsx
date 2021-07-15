import React, { useMemo } from 'react'
import { Group } from '../../../store/data/data.interfaces'
import { max, min, merge } from 'd3-array'
import BoxPlotPartial from './VisualizationPartials/BoxPlotPartial'
import { scaleLinear } from 'd3-scale'

interface BoxPlotPartials {
  w: number
  h: number
  pad: number
  groups: Group[]
}

const BoxPlot: React.FC<BoxPlotPartials> = (props) => {
  const spacingTop = 0
  const spacingLeft = 20
  const spacingRight = 220
  const spacingBottom = 40

  const boxWidth = props.w - 2 * props.pad

  const chartWidth = boxWidth - spacingRight - spacingLeft
  const chartHeight = props.h - 2 * props.pad - spacingTop - spacingBottom

  const unwantedKeys = ['label', 'Differenz zu Brutto', 'Sonstige Einnahmen', 'Erfasste Haushalte']

  const segmentHeight = chartHeight / Object.keys(props.groups[0]).filter(e => !unwantedKeys.includes(e)).length

  const maxValue = max(merge(props.groups.map(group => [group.Haushaltsbruttoeinkommen, group.Haushaltsnettoeinkommen, group['Ausgabefaehige Einkommen und Einnahmen'], group['Private Konsumausgaben'], group['Andere Ausgaben']])))
  const minValue = min(merge(props.groups.map(group => [group.Haushaltsbruttoeinkommen, group.Haushaltsnettoeinkommen, group['Ausgabefaehige Einkommen und Einnahmen'], group['Private Konsumausgaben'], group['Andere Ausgaben']])))

  const x = useMemo(() => {
    return scaleLinear().domain([minValue, maxValue]).range([0, chartWidth])
  }, [props.groups])

  const xTicks = useMemo(() => {
    return x.ticks(5)
  }, [props.groups])

  return (
    <svg width={props.w} height={props.h} style={{ padding: props.pad }}>
      {/** X Axis **/}
      <g transform={'translate(' + spacingLeft + ',' + (spacingTop + chartHeight) + ')'}>
        <path d={'M 0 0 L ' + chartWidth + ' 0'} stroke='darkgrey' />
        {
          xTicks.map((tick, index) => {
            return (
              <g key={index} transform={'translate(' + x(tick) + ',0)'}>
                <line y2={10} stroke='darkgrey' />
                <text style={{ fontSize: 12 }} transform='translate(0,23)' textAnchor='middle'>{tick}€</text>
              </g>
            )
          })
        }
      </g>
      {/** Draw Segments **/}
      <g transform={'translate(' + spacingLeft + ',' + spacingTop + ')'}>
        {
          Object.keys(props.groups[0]).filter(e => !unwantedKeys.includes(e)).map((key, index) => {
            return (
              <g key={index} transform={'translate(0,' + index * segmentHeight + ')'}>
                <BoxPlotPartial ticks={xTicks} label={key} w={chartWidth} h={chartHeight / Object.keys(props.groups[0]).filter(e => !unwantedKeys.includes(e)).length} values={props.groups.map(group => group[key])} min={minValue} max={maxValue} />
                <text style={{ fontSize: 11 }} transform={'translate(' + (chartWidth + 10) + ',30)'}>{key}</text>
              </g>
            )
          })
        }
      </g>
    </svg>
  )
}

export default BoxPlot
