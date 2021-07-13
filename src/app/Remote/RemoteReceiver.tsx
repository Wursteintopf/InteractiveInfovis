import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  changeScreen,
  resetUiState,
  setFlattenedBy,
  setSelectedHouseholdSize,
  setSelectedYear,
} from '../../store/ui/ui.actions'

const RemoteReceiver: React.FC = () => {
  const channel = new BroadcastChannel('remote')
  const dispatch = useDispatch()

  useEffect(() => {
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
      }
    })
  }, [])

  return (
    <></>
  )
}

export default RemoteReceiver
