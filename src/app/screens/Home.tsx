import React, {useEffect, useRef, useState} from 'react'
import {useSelector} from "react-redux";
import {getData} from "~store/data/data.selectors";
import d3 from 'd3';
import {
  CircleGraphZone, GeneralInfoZone,
  MainLayout,
  PieChartZone,
  StackedBarChartZone,
  StarplotZone,
  StreamGraphZone,
  TableZone
} from "~app/screens/HomeStyling";
import PieChart from "~app/Components/PieChart";
import Table from "~app/Components/Table";
import StackedBarChart from "~app/Components/StackedBarChart";
import StreamGraph from "~app/Components/StreamGraph";
import Starplot from "~app/Components/Starplot";
import CircleGraph from "~app/Components/CircleGraph";
import GeneralInfo from "~app/Components/GeneralInfo";

const Home: React.FC = () => {
  const ref = useRef()
  const data = useSelector(getData)

  return (
    <MainLayout>
      <PieChartZone>
        <PieChart />
      </PieChartZone>

      <TableZone>
        <Table />
      </TableZone>

      <StackedBarChartZone>
        <StackedBarChart />
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
