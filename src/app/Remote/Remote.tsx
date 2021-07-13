import React, { useEffect } from 'react'
import { HomeButton, HomeScreen, PhoneBackground, RemoteWrapper, Speaker } from './RemoteStyling'
import { useDispatch, useSelector } from 'react-redux'
import { getChannel, getCurrentScreen } from '../../store/ui/ui.selectors'
import RemoteScreen1 from './Screens/RemoteScreen1'
import RemoteScreen2 from './Screens/RemoteScreen2'
import {
  changeScreen,
  resetUiState,
  setFlattenedBy,
  setSelectedHouseholdSize,
  setSelectedYear, toggleHighlightedAttribute,
} from '../../store/ui/ui.actions'

const Remote: React.FC = () => {
  const currentScreen = useSelector(getCurrentScreen)
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
      }
    })
  }, [])

  return (
    <RemoteWrapper>
      <PhoneBackground>
        <Speaker />
        <HomeScreen>
          {currentScreen === 1 ? <RemoteScreen1 /> : <RemoteScreen2 />}
        </HomeScreen>
        <HomeButton />
      </PhoneBackground>
    </RemoteWrapper>
  )
}

export default Remote
