import React from 'react'
import { BlockWrapper, RemoteButton, RemoteHeader } from '../RemoteStyling'
import Switch from '@material-ui/core/Switch'
import { changeScreen, setFlattenedBy } from '../../../store/ui/ui.actions'
import { useDispatch, useSelector } from 'react-redux'
import { getFlattenedBy } from '../../../store/ui/ui.selectors'

interface RemoteProps {
  channel: BroadcastChannel
}

const RemoteScreen1: React.FC<RemoteProps> = (props) => {
  const dispatch = useDispatch()
  const flattenedBy = useSelector(getFlattenedBy)

  const buildButtons = () => {
    if (flattenedBy === 'year') {
      return ['2014', '2015', '2016', '2017', '2019'].map((year, index) => {
        return (
          <RemoteButton
            onClick={() => {
              props.channel.postMessage('switchToScreen2')
              dispatch(changeScreen(2))
            }}
            key={index}
          >
            {year}
          </RemoteButton>
        )
      })
    } else {
      return ['Haushalt mit 1 Person', 'Haushalt mit 2 Personen', 'Haushalt mit 3 Personen', 'Haushalt mit 4 Personen', 'Haushalt mit 5 und mehr Personen'].map((size, index) => {
        return (
          <RemoteButton
            onClick={() => {
              props.channel.postMessage('switchToScreen2')
              dispatch(changeScreen(2))
            }}
            key={index}
          >
            {size}
          </RemoteButton>
        )
      })
    }
  }

  return (
    <div>
      <RemoteHeader>Remote Control</RemoteHeader>
      <BlockWrapper>
        <div>Focus on:</div>
        Year <Switch
          color='default'
          checked={flattenedBy === 'household'}
          onChange={() => {
            if (flattenedBy === 'year') {
              props.channel.postMessage('setFlattenedByHousehold')
              dispatch(setFlattenedBy('household'))
            } else {
              props.channel.postMessage('setFlattenedByYear')
              dispatch(setFlattenedBy('year'))
            }
          }}
        /> Household
      </BlockWrapper>
      <BlockWrapper>
        <div>
          Filter by:
          {buildButtons()}
        </div>
      </BlockWrapper>
    </div>
  )
}

export default RemoteScreen1
