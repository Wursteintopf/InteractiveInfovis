import React from 'react'
import { BackButton, BlockWrapper, RemoteHeader } from '../RemoteStyling'
import { useDispatch } from 'react-redux'
import { changeScreen } from '../../../store/ui/ui.actions'

interface RemoteProps {
  channel: BroadcastChannel
}

const RemoteScreen2: React.FC<RemoteProps> = (props) => {
  const dispatch = useDispatch()

  return (
    <div>
      <RemoteHeader>Remote Control</RemoteHeader>
      <BlockWrapper>
        <BackButton
          onClick={() => {
            dispatch(changeScreen(1))
            props.channel.postMessage({
              command: 'changeScreen',
              payload: 1,
            })
          }}
        >
          Back To Overview
        </BackButton>
      </BlockWrapper>
    </div>
  )
}

export default RemoteScreen2
