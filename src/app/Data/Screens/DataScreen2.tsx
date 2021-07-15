import React from 'react'
import {
  BoxPlotArea,
  Header,
  HeaderArea,
  LineChartArea, ParallelCoordinatesArea,
  ScreenLayout,
  StackedAreaGraphArea,
  StackedBarChartArea,
  SubHeader,
} from '../Styling'
import { useSelector } from 'react-redux'
import { getFlattenedBy, getSelectedHouseholdSize, getSelectedYear } from '../../../store/ui/ui.selectors'
import { getFlattenedData } from '../../../store/data/data.selectors'
import { max } from 'd3-array'
import LineChart from '../../Components/Visualizations/LineChart'
import StackedAreaGraph from '../../Components/Visualizations/StackedAreaGraph'
import StackedBarChart from '../../Components/Visualizations/StackedBarChart'
import BoxPlot from '../../Components/Visualizations/BoxPlot'
import ParallelCoordinates from '../../Components/Visualizations/ParallelCoordinates'

const DataScreen2: React.FC = () => {
  const flattenedBy = useSelector(getFlattenedBy)
  const flattenedData = useSelector(getFlattenedData)

  const houseHoldSize = useSelector(getSelectedHouseholdSize)
  const year = useSelector(getSelectedYear)

  const columnWidth = (max([document.documentElement.clientWidth || 0, window.innerWidth || 0]) - 40) / 6
  const rowHeight = (max([document.documentElement.clientHeight || 0, window.innerHeight || 0]) - 140) / 6

  return (
    <ScreenLayout>
      <HeaderArea>
        <Header>
          Income and Expenditure in Germany
        </Header>
        <SubHeader>
          {flattenedBy === 'year' ? 'Selected Year: ' + year : 'Household with ' + houseHoldSize + ' persons'}
        </SubHeader>
      </HeaderArea>

      <LineChartArea>
        <LineChart w={columnWidth * 2} h={rowHeight * 6} groups={flattenedData} pad={20} />
      </LineChartArea>

      <StackedAreaGraphArea>
        <StackedAreaGraph groups={flattenedData} w={columnWidth * 2} h={rowHeight * 2} pad={20} />
      </StackedAreaGraphArea>

      <StackedBarChartArea>
        <StackedBarChart groups={flattenedData} w={columnWidth * 2} h={rowHeight * 3} pad={20} />
      </StackedBarChartArea>

      <BoxPlotArea>
        <BoxPlot w={columnWidth * 2} h={rowHeight * 3} pad={20} groups={flattenedData} />
      </BoxPlotArea>

      <ParallelCoordinatesArea>
        <ParallelCoordinates groups={flattenedData} w={columnWidth * 2} h={rowHeight * 4} pad={20} />
      </ParallelCoordinatesArea>

    </ScreenLayout>
  )
}

export default DataScreen2
