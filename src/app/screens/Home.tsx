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
import Starplot from '../Components/Visualizations/Starplot'
import StreamGraph from '../Components/Visualizations/StreamGraph'
import StackedBarChart from '../Components/Visualizations/StackedBarChart'

const Home: React.FC = () => {
  const stackedBarCharData = [
    {
      label: '2014',
      Haushaltsbruttoeinkommen: 4101,
      Haushaltsnettoeinkommen: 3147,
      'Ausgabefaehige Einkommen und Einnahmen': 3208,
      'Private Konsumausgaben': 2375,
      'Andere Ausgaben': 1669,
    },
    {
      label: '2015',
      Haushaltsbruttoeinkommen: 4196,
      Haushaltsnettoeinkommen: 3218,
      'Ausgabefaehige Einkommen und Einnahmen': 3276,
      'Private Konsumausgaben': 2391,
      'Andere Ausgaben': 1711,
    },
    {
      label: '2016',
      Haushaltsbruttoeinkommen: 4337,
      Haushaltsnettoeinkommen: 3314,
      'Ausgabefaehige Einkommen und Einnahmen': 3374,
      'Private Konsumausgaben': 2480,
      'Andere Ausgaben': 1698,
    },
  ]
  
  return (
    <MainLayout>
      <PieChartZone>
        <PieChart />
      </PieChartZone>

      <TableZone>
        <Table />
      </TableZone>

      <StackedBarChartZone>
        <StackedBarChart groups={stackedBarCharData} w={600} h={400} pad={10} />
      </StackedBarChartZone>

      <StreamGraphZone>
        <StreamGraph />
      </StreamGraphZone>

      <StarplotZone>
        <Starplot />
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

export default Home
