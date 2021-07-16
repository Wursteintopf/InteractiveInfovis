import React from 'react'
import { ColorBox, LegendBox, LegendRow } from './Styling/LegendStyling'
import { getColorByKey } from '../../../style/theme'

const Legend: React.FC = () => {
  const attributes = ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben']

  return (
    <LegendBox>
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
    </LegendBox>
  )
}

export default Legend
