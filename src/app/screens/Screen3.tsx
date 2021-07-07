import React, { useState } from 'react'
import { BottomLeft, BottomRight, Left, Right, Screen3Layout, UpperLeft, UpperRight } from './Screen3Styling'
import { useDispatch, useSelector } from 'react-redux'
import { getFlattenedData, getFullData } from '../../store/data/data.selectors'
import StarPlot from '../Components/Visualizations/StarPlot'
import Switch from '@material-ui/core/Switch'
import StackedBarChart from '../Components/Visualizations/StackedBarChart'
import { getFlattenedBy } from '../../store/ui/ui.selectors'
import { setFlattenedBy } from '../../store/ui/ui.actions'
import PieChart from '../Components/Visualizations/PieChart'

const Screen3: React.FC = () => {
  const dispatch = useDispatch()
  const flattenedData = useSelector(getFlattenedData)
  const flattenedBy = useSelector(getFlattenedBy)

  return (
    <Screen3Layout>
      <Left>
        <UpperLeft>
          <PieChart groups={flattenedData} size={400} pad={10} />
        </UpperLeft>
        <BottomLeft>
          <StackedBarChart groups={flattenedData} w={600} h={400} pad={10} />
        </BottomLeft>
      </Left>
      <Right>
        <UpperRight>
          <StarPlot groups={flattenedData} w={600} size={400} pad={10} />
        </UpperRight>
        <BottomRight>
          <div style={{ marginLeft: 80, marginTop: 80 }}>
            Flattened By Year <Switch
              color='default'
              inputProps={{ 'aria-label': 'checkbox with default color' }}
              onChange={() => {
                if (flattenedBy === 'year') dispatch(setFlattenedBy('household'))
                else dispatch(setFlattenedBy('year'))
              }}
            /> Flattened By Household
          </div>
        </BottomRight>
      </Right>
    </Screen3Layout>
  )
}

export default Screen3
