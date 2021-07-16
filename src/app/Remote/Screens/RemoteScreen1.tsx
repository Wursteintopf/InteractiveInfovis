import React from 'react'
import { BlockWrapper, RemoteButton, RemoteHeader } from '../RemoteStyling'
import Switch from '@material-ui/core/Switch'
import { changeScreen, setFlattenedBy, setSelectedHouseholdSize, setSelectedYear } from '../../../store/ui/ui.actions'
import { useDispatch, useSelector } from 'react-redux'
import { getChannel, getFlattenedBy } from '../../../store/ui/ui.selectors'
import { householdSize, year } from '../../../store/ui/ui.interfaces'
import HighlightToggles from './HighlightToggles'
import ZoomSlider from './ZoomSlider'

const RemoteScreen1: React.FC = () => {
  const dispatch = useDispatch()
  const flattenedBy = useSelector(getFlattenedBy)
  const channel = useSelector(getChannel)

  const buildButtons = () => {
    if (flattenedBy === 'year') {
      return [2014, 2015, 2016, 2017, 2019].map((year, index) => {
        return (
          <RemoteButton
            onClick={() => {
              channel.postMessage({
                command: 'setSelectedYear',
                payload: year,
              })
              channel.postMessage({
                command: 'changeScreen',
                payload: 2,
              })
              dispatch(changeScreen(2))
              dispatch(setSelectedYear(year as year))
            }}
            key={index}
          >
            {year}
          </RemoteButton>
        )
      })
    } else {
      return [1, 2, 3, 4, 5].map((size, index) => {
        return (
          <RemoteButton
            onClick={() => {
              channel.postMessage({
                command: 'setSelectedHouseholdSize',
                payload: size,
              })
              channel.postMessage({
                command: 'changeScreen',
                payload: 2,
              })
              dispatch(changeScreen(2))
              dispatch(setSelectedHouseholdSize(size as householdSize))
            }}
            key={index}
          >
            Haushalt mit {size} {size === 5 ? 'und mehr' : ''} Person{size !== 1 ? 'en' : ''}
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
              channel.postMessage({
                command: 'setFlattenedBy',
                payload: 'household',
              })
              dispatch(setFlattenedBy('household'))
            } else {
              channel.postMessage({
                command: 'setFlattenedBy',
                payload: 'year',
              })
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
      <HighlightToggles />
      <ZoomSlider />
    </div>
  )
}

export default RemoteScreen1
