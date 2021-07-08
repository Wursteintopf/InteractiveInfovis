import React, { useMemo, useRef } from 'react'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { max, merge } from 'd3-array'
import { useSelector } from 'react-redux'
import { getStackedExpenditureData, getStackedIncomeData } from '../../../store/data/data.selectors'
import { Group } from '../../../store/data/data.interfaces'
import { Rotate90DegreesCcw } from '@material-ui/icons'


interface  ParallelCoordinatesProps {
    groups: Group[]
    w: number
    h: number
    pad: number
}

const ParallelCoordinates: React.FC<ParallelCoordinatesProps> = (props) => {
    const labels = props.groups.map(group => group.label)
    const spacingLeft = 45
    const spacingBottom = 50
    const chartWidth = (props.w - (2 * props.pad) - spacingLeft)
    const chartHeight = (props.h - (2 * props.pad) - spacingBottom)
    const maxValue = max(merge(props.groups.map(group => [group.Haushaltsbruttoeinkommen, group.Haushaltsnettoeinkommen, group['Ausgabefaehige Einkommen und Einnahmen'], group['Private Konsumausgaben'], group['Andere Ausgaben']])))
    const axes = ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben', 'Haushaltsgröße', 'Jahr']


    const y = useMemo(() => {
        return scaleLinear().domain([0, maxValue]).range([0, chartHeight])
      }, [props.groups])



    const yTicks = useMemo(() => {
        return y.ticks()
      }, [props.groups])


    const xOffSet = chartWidth / axes.length
    const yOffSet = chartHeight / yTicks.length
    
    console.log("axes = " + axes);


    return (

        <svg width={props.w} height={props.h} style={{ padding: props.pad }}>
            {/** Y Axis **/}
            <g>
                {
                    axes.map((axe, index) => {
                        
                        return (
                            <g key={index}>
                                <path d={'M ' + (spacingLeft + ((index) * xOffSet)) + ' 0 L ' + (spacingLeft + ((index) * xOffSet)) + ' ' + chartHeight} stroke='black'></path>
                            </g>
                        )
                    })
                }
            </g>
        
            {/** Labels **/}
            <g>
                {
                    
                    axes.map((axes, index) => {
                        return (
                            <g key={index} transform={'translate(' + (spacingLeft + index * xOffSet) + ',' + (chartHeight + 20) + ')rotate(45)'} style={{ fontSize: 12 }}>
                                <text>{axes}</text>
                            </g>
                        )
                    })
                }
            </g>
        </svg>
  );
};

export default ParallelCoordinates;