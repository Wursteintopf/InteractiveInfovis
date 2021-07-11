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
import LineChart from '../Components/Visualizations/LineChart'
import StackedAreaGraph from '../Components/Visualizations/StackedAreaGraph'
import BoxPlot from '../Components/Visualizations/BoxPlot'

const Screen3: React.FC = () => {
  const dispatch = useDispatch()
  const flattenedData = useSelector(getFlattenedData)
  const flattenedBy = useSelector(getFlattenedBy)

  return (
    <Screen3Layout>
      <Left>
        <UpperLeft>
          <StackedAreaGraph w={600} h={400} pad={10} groups={flattenedData} />
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
          <BoxPlot w={700} h={400} groups={flattenedData} pad={10} />
          <div style={{ marginLeft: 80, marginTop: 0 }}>
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
