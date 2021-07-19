import React, { useMemo } from 'react'
import { ColorBox, LegendBox, LegendRow } from './Styling/LegendStyling'
import { getColorByKey } from '../../../style/theme'
import { scaleOrdinal } from 'd3-scale'
import { useSelector } from 'react-redux'
import { getFlattenedData } from '../../../store/data/data.selectors'

const Legend: React.FC = () => {
  const attributes = ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben']
  const labels = useSelector(getFlattenedData).map(group => group.label)

  const color = useMemo(() => {
    return scaleOrdinal().domain(labels).range(['#5f0f40', '#9a031e', '#fb8b24', '#e36414', '#0f4c5c'])
  }, [])

  return (
    <LegendBox>
      <div>
        {
          attributes.map((attr, index) => {
            return (
              <LegendRow key={index}>
                <ColorBox colorOfTheBox={getColorByKey(attr)} />
                <div>{attr}</div>
              </LegendRow>
            )
          })
        }
      </div>
      <div style={{ marginLeft: 20 }}>
        {
          labels.map((label, index) => {
            return (
              <LegendRow key={index}>
                <ColorBox colorOfTheBox={color(label)} />
                <div>{label}</div>
              </LegendRow>
            )
          })
        }
      </div>
    </LegendBox>
  )
}

export default Legend
