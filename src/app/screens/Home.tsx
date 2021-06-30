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
      income: {
        Haushaltsbruttoeinkommen: 10,
        Haushaltsnettoeinkommen: 20,
        'Ausgabefaehige Einkommen und Einnahmen': 30,
      },
      expenditure: {
        'Private Konsumausgaben': 10,
        'Andere Ausgaben': 20,
      },
    },
    {
      label: '2015',
      income: {
        Haushaltsbruttoeinkommen: 10,
        Haushaltsnettoeinkommen: 20,
        'Ausgabefaehige Einkommen und Einnahmen': 30,
      },
      expenditure: {
        'Private Konsumausgaben': 10,
        'Andere Ausgaben': 20,
      },
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
        <StackedBarChart groups={stackedBarCharData} />
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
