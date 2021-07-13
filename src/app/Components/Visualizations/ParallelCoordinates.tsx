import React, { useMemo, useRef } from 'react'
import { scaleLinear, scaleOrdinal } from 'd3-scale'
import { max, merge } from 'd3-array'
import { useSelector } from 'react-redux'
import { Group } from '../../../store/data/data.interfaces'
import { getAllData } from '../../../store/data/data.selectors'
import { path } from 'd3-path'



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
    const axes = ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben']

    const finance = useSelector(getAllData)

    const y = useMemo(() => {
        return scaleLinear().domain([0, maxValue]).range([chartHeight, 0])
      }, [props.groups])



    const yTicks = useMemo(() => {
        return y.ticks()
      }, [props.groups])


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
                {
                    props.groups.map((group, index) => {

                        console.log(group)

                        const box = (context) => {
                            axes.forEach( (axe, index) => {
                                if (index === 0){
                                    console.log(y(group[axe]))
                                    context.moveTo((index + 1)* xOffSet, y(group[axe]))
                                } else {
                                    context.lineTo((index + 1) * xOffSet, y(group[axe]))
                                }
                            })

                            return context
                        }


                        return <path d={box(path())} fill='none' stroke='lightgrey'></path>
                    })
            
                
                /**finance.map((type, index) => {
                    console.log("finance[1] = " + finance[index])
                    return (
                        <g key={index}>
                            {
                                type.map((values, index) => {
                                    console.log("values[0] = " + values[0])

                                    const box = (context) => {
                                        context.moveTo(0,0)
                                        context.lineTo(props.w, 30)
                                        context.lineTo(props.w, props.h)
                                        context.lineTo(10, props.h)
                                        context.lineTo(10, 30)

                                        return context
                                    }
        
                                    return <path d={box(path())} fill='none' stroke='lightgrey' />
                                })
                                
                            }
                        </g>
                    )
                        })**/
                }
            </g>
        </svg>

  );
};

export default ParallelCoordinates;