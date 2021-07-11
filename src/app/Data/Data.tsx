import React from 'react'
import RemoteReceiver from '../Remote/RemoteReceiver'
import { useSelector } from 'react-redux'
import { getCurrentScreen } from '../../store/ui/ui.selectors'
import DataScreen1 from './Screens/DataScreen1'
import DataScreen2 from './Screens/DataScreen2'

const Data: React.FC = () => {
  const currentScreen = useSelector(getCurrentScreen)

  return (
    <div>
      <RemoteReceiver />
      {currentScreen === 1 ? <DataScreen1 /> : <DataScreen2 />}
    </div>
  )
}

export default Data
