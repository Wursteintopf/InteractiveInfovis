import React, { useState } from 'react'
import { BlockWrapper } from '../RemoteStyling'
import Slider from '@material-ui/core/Slider'
import { useDispatch, useSelector } from 'react-redux'
import { getMaxValue } from '../../../store/data/data.selectors'
import { getChannel, getZoom } from '../../../store/ui/ui.selectors'
import { setZoom } from '../../../store/ui/ui.actions'

const ZoomSlider: React.FC = () => {
  const dispatch = useDispatch()

  const channel = useSelector(getChannel)

  const maxValue = useSelector(getMaxValue)
  const zoomValue = useSelector(getZoom)

  const handleChange = (event, newValue) => {
    dispatch(setZoom(newValue))
    channel.postMessage({
      command: 'setZoom',
      payload: newValue,
    })
  }

  return (
    <BlockWrapper>
      Zoom on specific values:
      <br /><br />
      <Slider
        value={zoomValue}
        min={0}
        max={maxValue}
        onChange={handleChange}
        valueLabelDisplay='auto'
        style={{ width: 200 }}
      />
    </BlockWrapper>
  )
}

export default ZoomSlider
