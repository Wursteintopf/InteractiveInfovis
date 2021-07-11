import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { changeScreen, resetUiState, setFlattenedBy } from '../../store/ui/ui.actions'

const RemoteReceiver: React.FC = () => {
  const channel = new BroadcastChannel('remote')
  const dispatch = useDispatch()

  useEffect(() => {
    channel.addEventListener('message', message => {
      switch (message.data) {
        case 'resetUiState':
          dispatch(resetUiState())
          break
        case 'setFlattenedByHousehold':
          dispatch(setFlattenedBy('household'))
          break
        case 'setFlattenedByYear':
          dispatch(setFlattenedBy('year'))
          break
        case 'switchToScreen1':
          dispatch(changeScreen(1))
          break
        case 'switchToScreen2':
          dispatch(changeScreen(2))
          break
      }
    })
  }, [])

  return (
    <></>
  )
}

export default RemoteReceiver
