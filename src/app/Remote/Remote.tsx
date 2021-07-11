import React, { useEffect } from 'react'
import { HomeButton, HomeScreen, PhoneBackground, RemoteWrapper, Speaker } from './RemoteStyling'
import { useSelector } from 'react-redux'
import { getCurrentScreen } from '../../store/ui/ui.selectors'
import RemoteScreen1 from './Screens/RemoteScreen1'
import RemoteScreen2 from './Screens/RemoteScreen2'

const Remote: React.FC = () => {
  const currentScreen = useSelector(getCurrentScreen)
  const channel = new BroadcastChannel('remote')

  useEffect(() => {
    channel.postMessage('resetUiState')
  }, [])

  return (
    <RemoteWrapper>
      <PhoneBackground>
        <Speaker />
        <HomeScreen>
          {currentScreen === 1 ? <RemoteScreen1 channel={channel} /> : <RemoteScreen2 channel={channel} />}
        </HomeScreen>
        <HomeButton />
      </PhoneBackground>
    </RemoteWrapper>
  )
}

export default Remote
