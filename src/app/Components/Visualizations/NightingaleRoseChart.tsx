import React, { useMemo } from 'react'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { max, merge } from 'd3-array'
import { useSelector } from 'react-redux'
import { getStackedExpenditureData, getStackedIncomeData } from '../../../store/data/data.selectors'
import { Group } from '../../../store/data/data.interfaces'
import { convertAngleAndLengthToCoordinates } from '../../../util/MathUtil'
import { getColorByKey } from '../../../style/theme'
import { path } from 'd3-path'

export interface PieChartProps {
  groups: Group[]
  size: number
  w: number
  pad: number
}

const NightingaleRoseChart: React.FC<PieChartProps> = (props) => {
  const labels = props.groups.map(group => group.label)
  const chartSize = (props.size - (2 * props.pad))
  const radius = chartSize / 2
  const maxValue = max(merge(props.groups.map(group => [group.Haushaltsnettoeinkommen + group['Differenz zu Brutto'] + group['Sonstige Einnahmen'], group['Private Konsumausgaben'] + group['Andere Ausgaben']])))
  let allHouseholds = 0
  props.groups.forEach(group => { allHouseholds += group['Erfasste Haushalte'] })

  const scale = useMemo(() => {
    return scaleLinear().domain([0, maxValue]).range([0, radius])
  }, [props.groups])

  const rotationScale = useMemo(() => {
    return scaleLinear().domain([0, allHouseholds]).range([0, 360])
  }, [props.groups])

  const stackedIncome = useSelector(getStackedIncomeData)
  const stackedExpenditure = useSelector(getStackedExpenditureData)

  const arcPath = (r1, r2, a1, a2) => {
    const [x1, y1] = convertAngleAndLengthToCoordinates(a1, r1)
    const [x2, y2] = convertAngleAndLengthToCoordinates(a1, r2)
    const [x3, y3] = convertAngleAndLengthToCoordinates(a2, r2)
    const [x4, y4] = convertAngleAndLengthToCoordinates(a2, r1)

    return 'M ' + x2 + ' ' + y2 + ' A ' + r2 + ' ' + r2 + ' 0 0 1 ' + x3 + ' ' + y3 + ' L ' + x4 + ' ' + y4 + ' A ' + r1 + ' ' + r1 + ' 0 0 0 ' + x1 + ' ' + y1
  }

  const separator = (context, angle) => {
    const [x, y] = convertAngleAndLengthToCoordinates(angle, props.size)
    context.moveTo(0, 0)
    context.lineTo(x, y)

    return context
  }

  return (
    <svg viewBox={-props.w / 2 + ' ' + -props.size / 2 + ' ' + props.w + ' ' + props.size} width={props.w} height={props.size} style={{ padding: props.pad }}>
      {
        stackedIncome.map((type, index) => {
          let angle = 0
          return (
            <g key={index}>
              {
                type.map((inc, index2) => {
                  const a1 = rotationScale(angle)
                  angle += inc.data['Erfasste Haushalte'] / 2
                  const a2 = rotationScale(angle)
                  angle += inc.data['Erfasste Haushalte'] / 2

                  return <path key={index2} d={arcPath(scale(inc[0]), scale(inc[1]), a1, a2)} fill={getColorByKey(type.key)} />
                })
              }
            </g>
          )
        })
      }
      {
        stackedExpenditure.map((type, index) => {
          let angle = 0
          return (
            <g key={index}>
              {
                type.map((inc, index2) => {
                  angle += inc.data['Erfasste Haushalte'] / 2
                  const a1 = rotationScale(angle)
                  angle += inc.data['Erfasste Haushalte'] / 2
                  const a2 = rotationScale(angle)

                  const [x, y] = convertAngleAndLengthToCoordinates(a1, radius + 20)

                  return (
                    <g key={index2}>
                      <path d={arcPath(scale(inc[0]), scale(inc[1]), a1, a2)} fill={getColorByKey(type.key)} />
                      <path d={separator(path(), a2)} stroke='white' strokeWidth={5} />
                      {index === 1 ? <text transform={'translate(' + x + ',' + y + ')'} textAnchor='middle' style={{ fontSize: 12 }}>{labels[index2]}</text> : ''}
                    </g>
                  )
                })
              }
            </g>
          )
        })
      }
    </svg>
  )
}

export default NightingaleRoseChart