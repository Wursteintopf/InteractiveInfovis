import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  changeScreen,
  resetUiState,
  setFlattenedBy,
  setSelectedHouseholdSize,
  setSelectedYear, toggleHighlightedAttribute,
} from '../../store/ui/ui.actions'
import { getChannel } from '../../store/ui/ui.selectors'

const RemoteReceiver: React.FC = () => {
  const channel = useSelector(getChannel)
  const dispatch = useDispatch()

  useEffect(() => {
    channel.postMessage({
      command: 'resetUiState',
    })

    channel.addEventListener('message', message => {
      switch (message.data.command) {
        case 'resetUiState':
          dispatch(resetUiState)
          break

        case 'setFlattenedBy':
          dispatch(setFlattenedBy(message.data.payload))
          break

        case 'changeScreen':
          dispatch(changeScreen(message.data.payload))
          break

        case 'setSelectedYear':
          dispatch(setSelectedYear(message.data.payload))
          break

        case 'setSelectedHouseholdSize':
          dispatch(setSelectedHouseholdSize(message.data.payload))
          break

        case 'toggleHighlightedAttribute':
          dispatch(toggleHighlightedAttribute(message.data.payload))
          break
      }
    })
  }, [])

  return (
    <></>
  )
}

export default RemoteReceiver
