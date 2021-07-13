import React from 'react'
import { BlockWrapper, CheckBoxWrapper } from '../RemoteStyling'
import { Checkbox } from '@material-ui/core'
import { attribute } from '../../../store/ui/ui.interfaces'
import { toggleHighlightedAttribute } from '../../../store/ui/ui.actions'
import { useDispatch, useSelector } from 'react-redux'
import { getChannel, getHighlightedAttributes } from '../../../store/ui/ui.selectors'

const HighlightToggles: React.FC = () => {
  const dispatch = useDispatch()
  const highlightedAttributes = useSelector(getHighlightedAttributes)
  const channel = useSelector(getChannel)

  const buildHighLightToggles = () => {
    return ['Haushaltsbruttoeinkommen', 'Haushaltsnettoeinkommen', 'Ausgabefaehige Einkommen und Einnahmen', 'Private Konsumausgaben', 'Andere Ausgaben'].map((attr, index) => {
      return (
        <CheckBoxWrapper key={index} style={{ fontSize: 12 }}>
          <Checkbox
            checked={highlightedAttributes.includes(attr as attribute)}
            onChange={() => {
              channel.postMessage({
                command: 'toggleHighlightedAttribute',
                payload: attr as attribute,
              })
              dispatch(toggleHighlightedAttribute(attr as attribute))
            }}
            color='default'
          />
          <div>{attr}</div>
        </CheckBoxWrapper>
      )
    })
  }

  return (
    <BlockWrapper>
      Highlight:
      {buildHighLightToggles()}
    </BlockWrapper>
  )
}

export default HighlightToggles
