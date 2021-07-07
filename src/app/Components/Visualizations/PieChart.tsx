import React, { useMemo } from 'react'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { max, merge } from 'd3-array'
import { useSelector } from 'react-redux'
import { getStackedExpenditureData, getStackedIncomeData } from '../../../store/data/data.selectors'
import { Group } from '../../../store/data/data.interfaces'
import { useRadioGroup } from '@material-ui/core'
import { convertAngleAndLengthToCoordinates } from '../../../util/MathUtil'

export interface PieChartProps {
  groups: Group[]
  size: number
  pad: number
}

const PieChart: React.FC<PieChartProps> = (props) => {
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

  const color = useMemo(() => {
    return scaleOrdinal().domain(labels).range(['#e41a1c', '#377eb8', '#4daf4a'])
  }, [])

  const stackedIncome = useSelector(getStackedIncomeData)
  const stackedExpenditure = useSelector(getStackedExpenditureData)

  return (
    <svg viewBox={-props.size / 2 + ' ' + -props.size / 2 + ' ' + props.size + ' ' + props.size} width={props.size} height={props.size} style={{ padding: props.pad }}>
      {
        stackedIncome.map((type, index) => {
          let angle = 0
          return (
            <g key={index}>
              {
                type.map((inc, index2) => {
                  const [x1, y1] = convertAngleAndLengthToCoordinates(rotationScale(angle), scale(inc[0]))
                  const [x2, y2] = convertAngleAndLengthToCoordinates(rotationScale(angle), scale(inc[1]))
                  angle += inc.data['Erfasste Haushalte'] / 2
                  const [x3, y3] = convertAngleAndLengthToCoordinates(rotationScale(angle), scale(inc[1]))
                  const [x4, y4] = convertAngleAndLengthToCoordinates(rotationScale(angle), scale(inc[0]))
                  angle += inc.data['Erfasste Haushalte'] / 2

                  return <path key={index2} d={'M ' + x2 + ' ' + y2 + ' A ' + scale(inc[1]) + ' ' + scale(inc[1]) + ' 0 0 1 ' + x3 + ' ' + y3 + ' L ' + x4 + ' ' + y4 + ' A ' + scale(inc[0]) + ' ' + scale(inc[0]) + ' 0 0 0 ' + x1 + ' ' + y1} fill={color(index)} />
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
                  const [x1, y1] = convertAngleAndLengthToCoordinates(rotationScale(angle), scale(inc[0]))
                  const [x2, y2] = convertAngleAndLengthToCoordinates(rotationScale(angle), scale(inc[1]))
                  angle += inc.data['Erfasste Haushalte'] / 2
                  const [x3, y3] = convertAngleAndLengthToCoordinates(rotationScale(angle), scale(inc[1]))
                  const [x4, y4] = convertAngleAndLengthToCoordinates(rotationScale(angle), scale(inc[0]))

                  return <path key={index2} d={'M ' + x2 + ' ' + y2 + ' A ' + scale(inc[1]) + ' ' + scale(inc[1]) + ' 0 0 1 ' + x3 + ' ' + y3 + ' L ' + x4 + ' ' + y4 + ' A ' + scale(inc[0]) + ' ' + scale(inc[0]) + ' 0 0 0 ' + x1 + ' ' + y1} fill={color(index)} />
                })
              }
            </g>
          )
        })
      }
    </svg>
  )
}

export default PieChart
