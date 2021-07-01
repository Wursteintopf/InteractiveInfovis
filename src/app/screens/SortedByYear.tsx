import React, { useEffect, useRef, useState } from 'react'
import {
  CircleGraphZone,
  GeneralInfoZone,
  MainLayout,
  PieChartZone, StackedBarChartZone,
  StarplotZone,
  StreamGraphZone,
  TableZone,
} from './HomeStyling'
import PieChart from '../Components/Visualizations/PieChart'
import Table from '../Components/Visualizations/Table'
import CircleGraph from '../Components/Visualizations/CircleGraph'
import GeneralInfo from '../Components/Visualizations/GeneralInfo'
import StarPlot from '../Components/Visualizations/StarPlot'
import StreamGraph from '../Components/Visualizations/StreamGraph'
import StackedBarChart from '../Components/Visualizations/StackedBarChart'
import { useSelector } from 'react-redux'
import { getData } from '../../store/data/data.selectors'

const SortedByYear: React.FC = () => {
  const data = useSelector(getData)

  const flattenedByYear = (data) => {
    return Object.keys(data).map(key => {
      return {
        label: key,
        Haushaltsbruttoeinkommen: data[key].Insgesamt.Haushaltsbruttoeinkommen,
        Haushaltsnettoeinkommen: data[key].Insgesamt.Haushaltsnettoeinkommen,
        'Ausgabefaehige Einkommen und Einnahmen': data[key].Insgesamt['Ausgabefaehige Einkommen und Einnahmen'],
        'Differenz zu Brutto': data[key].Insgesamt['Differenz zu Brutto'],
        'Sonstige Einnahmen': data[key].Insgesamt['Sonstige Einnahmen'],
        'Private Konsumausgaben': data[key].Insgesamt['Private Konsumausgaben'],
        'Andere Ausgaben': data[key].Insgesamt['Andere Ausgaben'],
      }
    })
  }

  return (
    <MainLayout>
      <PieChartZone>
        <PieChart />
      </PieChartZone>

      <TableZone>
        <Table />
      </TableZone>

      <StackedBarChartZone>
        <StackedBarChart groups={flattenedByYear(data)} w={600} h={400} pad={10} />
      </StackedBarChartZone>

      <StreamGraphZone>
        <StreamGraph />
      </StreamGraphZone>

      <StarplotZone>
        <StarPlot />
      </StarplotZone>

      <CircleGraphZone>
        <CircleGraph />
      </CircleGraphZone>

      <GeneralInfoZone>
        <GeneralInfo />
      </GeneralInfoZone>
    </MainLayout>
  )
}

export default SortedByYear
