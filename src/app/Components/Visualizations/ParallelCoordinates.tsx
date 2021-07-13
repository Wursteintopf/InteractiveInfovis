import React, { useMemo, useRef } from 'react'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { max, merge } from 'd3-array'
import { useSelector } from 'react-redux'
import { Group } from '../../../store/data/data.interfaces'
import { getAllData } from '../../../store/data/data.selectors'



interface  ParallelCoordinatesProps {
    groups: Group[]
    w: number
    h: number
    pad: number
}

const ParallelCoordinates: React.FC<ParallelCoordinatesProps> = (props) => {
    const labels = props.groups.map(group => group.label)
    const spacingLeft = 70
    const spacingBottom = 70
    const chartWidth = (props.w - (2 * props.pad) - spacingLeft)
    const chartHeight = (props.h - (2 * props.pad) - spacingBottom)
    const maxValue = max(merge(props.groups.map(group => [group.Haushaltsbruttoeinkommen, group.Haushaltsnettoeinkommen, group['Ausgabefaehige Einkommen und Einnahmen'], group['Private Konsumausgaben'], group['Andere Ausgaben']])))
    const axes = ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben', 'Haushaltsgröße', 'Jahr']

    const finance = useSelector(getAllData)

    const y = useMemo(() => {
        return scaleLinear().domain([0, maxValue]).range([0, chartHeight])
      }, [props.groups])



    const yTicks = useMemo(() => {
        return y.ticks()
      }, [props.groups])


    const xOffSet = chartWidth / axes.length
    const yOffSet = chartHeight / yTicks.length
    
    console.log("axes = " + axes);
    console.log("Groups = " + props.groups)
    console.log("Groups[0] = " + props.groups[0])
    console.log("finance = " + finance)

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
                            <g key={index} transform={'translate(' + (spacingLeft + index * xOffSet) + ',' + (chartHeight + 20) + ')rotate(25)'} style={{ fontSize: 12 }}>
                                <text>{axes}</text>
                            </g>
                        )
                    })
                }
            </g>
            {/** Values**/}
            <g>
                {/**
                    props.groups.map((group, index) => {
                        const coordList = axes.map((axe, index2) => ...)
                        const height = y() - y()
                        const yPos = chartHeight - height - y()
                        let pathString = 'M '
                        coordList.forEach(coord => {
                            pathString += ... + ' ' + ...
                        })


                        return <path key={index} d={pathString} strokeWidth={2}></path>
                    })
                **/}
            </g>
        </svg>

  );
};

export default ParallelCoordinates;