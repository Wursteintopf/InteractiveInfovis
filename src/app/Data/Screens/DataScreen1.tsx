import React from 'react'
import {
  Header,
  HeaderArea,
  LineChartArea,
  RoseChartArea,
  ScreenLayout,
  StackedAreaGraphArea, StackedBarChartArea,
  StarPlotArea, SubHeader,
} from '../Styling'
import NightingaleRoseChart from '../../Components/Visualizations/NightingaleRoseChart'
import { useSelector } from 'react-redux'
import { getFlattenedData } from '../../../store/data/data.selectors'
import { min, max } from 'd3-array'
import StackedAreaGraph from '../../Components/Visualizations/StackedAreaGraph'
import LineChart from '../../Components/Visualizations/LineChart'
import StarPlot from '../../Components/Visualizations/StarPlot'
import StackedBarChart from '../../Components/Visualizations/StackedBarChart'
import ParallelCoordinates from '../../Components/Visualizations/ParallelCoordinates'
import { getFlattenedBy } from '../../../store/ui/ui.selectors'

const DataScreen1: React.FC = () => {
  const flattenedData = useSelector(getFlattenedData)

  const flattenBy = useSelector(getFlattenedBy)

  const columnWidth = (max([document.documentElement.clientWidth || 0, window.innerWidth || 0]) - 40) / 6
  const rowHeight = (max([document.documentElement.clientHeight || 0, window.innerHeight || 0]) - 140) / 6

  return (
    <ScreenLayout>
      <HeaderArea>
        <Header>
          Income and Expenditure in Germany
        </Header>
        <SubHeader>
          Focus on {flattenBy === 'year' ? 'Year' : 'Householdsize'}
        </SubHeader>
      </HeaderArea>

      <RoseChartArea>
        <NightingaleRoseChart groups={flattenedData} w={columnWidth * 2} size={min([columnWidth * 2, rowHeight * 4])} pad={20} />
      </RoseChartArea>

      <StackedAreaGraphArea>
        <StackedAreaGraph groups={flattenedData} w={columnWidth * 2} h={rowHeight * 2} pad={20} />
      </StackedAreaGraphArea>

      <LineChartArea>
        <LineChart w={columnWidth * 2} h={rowHeight * 6} groups={flattenedData} pad={20} />
      </LineChartArea>
      
      <StarPlotArea>
        <StarPlot groups={flattenedData} w={columnWidth * 2} size={rowHeight * 3} pad={20} />
      </StarPlotArea>

      <StackedBarChartArea>
        <StackedBarChart groups={flattenedData} w={columnWidth * 2} h={rowHeight * 3} pad={20} />
      </StackedBarChartArea>
    </ScreenLayout>
  )
}

export default DataScreen1
