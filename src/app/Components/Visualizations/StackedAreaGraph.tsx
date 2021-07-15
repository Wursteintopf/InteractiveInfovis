import React, { useMemo } from 'react'
import { Group } from '../../../store/data/data.interfaces'
import { useSelector } from 'react-redux'
import { getStackedExpenditureData, getStackedIncomeData } from '../../../store/data/data.selectors'
import { scaleLinear, scaleBand, scaleOrdinal } from 'd3-scale'
import { max, merge } from 'd3-array'
import bezierSpline from '@freder/bezier-spline'
import { path } from 'd3-path'
import { getColorByKey, getMutedColorByKey } from '../../../style/theme'
import { getHighlightedAttributes } from '../../../store/ui/ui.selectors'
import { attribute } from '../../../store/ui/ui.interfaces'
import { getAttributeFromString } from '../../../util/DataUtil'

interface StackedAreaGraphProps {
  groups: Group[]
  w: number
  h: number
  pad: number
}

const StackedAreaGraph: React.FC<StackedAreaGraphProps> = (props) => {
  const highlighted = useSelector(getHighlightedAttributes)

  const color = (key: attribute) => {
    if (highlighted.includes(key) || highlighted.length === 0) return getColorByKey(key)
    else return getMutedColorByKey(key)
  }

  const labels = props.groups.map(group => group.label)

  const stackedIncome = useSelector(getStackedIncomeData)
  const stackedExpenditure = useSelector(getStackedExpenditureData)

  const spacingLeft = 20
  const spacingRight = 50
  const boxWidth = props.w - (2 * props.pad)
  const chartHeight = props.h - (2 * props.pad)
  const chartWidth = boxWidth - spacingLeft - spacingRight

  const maxInc = max(props.groups.map(group => group.Haushaltsnettoeinkommen + group['Differenz zu Brutto'] + group['Sonstige Einnahmen']))
  const maxExp = max(props.groups.map(group => group['Private Konsumausgaben'] + group['Andere Ausgaben']))

  const incomeY = useMemo(() => {
    return scaleLinear().domain([0, maxInc]).range([chartHeight / 2, 0])
  }, [props.groups])

  const incTicks = useMemo(() => {
    return incomeY.ticks(5)
  }, [props.groups])

  const expenditureY = useMemo(() => {
    return scaleLinear().domain([0, maxExp]).range([chartHeight / 2, chartHeight])
  }, [props.groups])

  const expTicks = useMemo(() => {
    return expenditureY.ticks(3)
  }, [props.groups])

  const xOffSet = chartWidth / (labels.length - 1)

  const area = (context, type, incOrExp: 'inc' | 'exp') => {
    const points = type.map((p, index) => [xOffSet * index + spacingLeft, incOrExp === 'inc' ? incomeY(p[1]) : expenditureY(p[1])])
    const controlPoints = bezierSpline.getControlPoints(points)
    const combined = bezierSpline.combinePoints(points, controlPoints)
    const segments = bezierSpline.getSegments(combined)

    segments.forEach((segment, index) => {
      if (index === 0) context.moveTo(segment[0][0], segment[0][1])
      context.bezierCurveTo(segment[1][0], segment[1][1], segment[2][0], segment[2][1], segment[3][0], segment[3][1])
    })

    const pointsBack = type.map((p, index) => [xOffSet * index + spacingLeft, incOrExp === 'inc' ? incomeY(p[0]) : expenditureY(p[0])]).reverse()
    const controlPointsBack = bezierSpline.getControlPoints(pointsBack)
    const combinedBack = bezierSpline.combinePoints(pointsBack, controlPointsBack)
    const segmentsBack = bezierSpline.getSegments(combinedBack)

    segmentsBack.forEach((segment, index) => {
      if (index === 0) context.lineTo(segment[0][0], segment[0][1])
      context.bezierCurveTo(segment[1][0], segment[1][1], segment[2][0], segment[2][1], segment[3][0], segment[3][1])
    })

    return context
  }

  return (
    <svg width={props.w} height={props.h} style={{ padding: props.pad }}>
      {/** Income Data above axis **/}
      {
        stackedIncome.map((type, index) => <path key={index} d={area(path(), type, 'inc')} fill={color(getAttributeFromString(type.key))} />)
      }
      {/** Expenditure Data below axis **/}
      {
        stackedExpenditure.map((type, index) => <path key={index} d={area(path(), type, 'exp')} fill={color(getAttributeFromString(type.key))} />)
      }
      {/** X Axis **/}
      <g>
        <path d={'M ' + spacingLeft + ' ' + chartHeight / 2 + ' L ' + (boxWidth - spacingRight) + ' ' + chartHeight / 2} stroke='darkgrey' />
        {
          labels.map((label, index) => {
            return (
              <g key={index} transform={'translate(' + (spacingLeft + index * xOffSet) + ' ' + (chartHeight / 2 - 5) + ')'}>
                <line y2={10} stroke='darkgrey' />
                <text transform='translate(0,20)' textAnchor='middle' style={{ fontSize: 12 }}>{label.startsWith('5') ? label.substring(0, 10) : label}</text>
              </g>
            )
          })
        }
      </g>
      {/** Y Axis **/}
      <g transform={`translate(${chartWidth + spacingLeft},0)`}>
        <path d={`M 0 0 L 0 ${chartHeight}`} stroke='darkgrey' />
        {
          incTicks.map(tick => {
            if (tick !== 0) {
              return (
                <g key={tick} transform={`translate(0,${incomeY(tick)})`}>
                  <text fontSize={12} transform='translate(10,5)'>{tick}€</text>
                  <line x2={7} stroke='darkgrey' />
                </g>
              )
            }
          })
        }
        {
          expTicks.map(tick => {
            if (tick !== 0) {
              return (
                <g key={tick} transform={`translate(0,${expenditureY(tick)})`}>
                  <text fontSize={12} transform='translate(10,5)'>{tick}€</text>
                  <line x2={7} stroke='darkgrey' />
                </g>
              )
            }
          })
        }
      </g>
    </svg>
  )
}

export default StackedAreaGraph
