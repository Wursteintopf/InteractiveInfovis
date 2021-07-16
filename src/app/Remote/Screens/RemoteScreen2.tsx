import React from 'react'
import { BackButton, BlockWrapper, CheckBoxWrapper, RemoteHeader } from '../RemoteStyling'
import { useDispatch, useSelector } from 'react-redux'
import { changeScreen, toggleHighlightedAttribute } from '../../../store/ui/ui.actions'
import { Checkbox } from '@material-ui/core'
import { getChannel, getHighlightedAttributes } from '../../../store/ui/ui.selectors'
import { attribute } from '../../../store/ui/ui.interfaces'
import HighlightToggles from './HighlightToggles'
import ZoomSlider from './ZoomSlider'

const RemoteScreen2: React.FC = () => {
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
    <div>
      <RemoteHeader>Remote Control</RemoteHeader>
      <BlockWrapper>
        <BackButton
          onClick={() => {
            channel.postMessage({
              command: 'changeScreen',
              payload: 1,
            })
            dispatch(changeScreen(1))
          }}
        >
          Back To Overview
        </BackButton>
      </BlockWrapper>
      <HighlightToggles />
      <ZoomSlider />
    </div>
  )
}

export default RemoteScreen2
