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
import { Group } from '../Components/Visualizations/VisualizationInterfaces'
import { useSelector } from 'react-redux'
import { getData } from '../../store/data/data.selectors'
import Switch from '@material-ui/core/Switch';

const Home: React.FC = () => {
  const data = useSelector(getData)

  const flattenByHousehold = (data) => {
    let flattened: Group[] = []
    Object.keys(data).forEach(key => {
      Object.keys(data[key]).forEach(key2 => {
        if (flattened.filter(e => e.label === key2).length >= 1) {
          const search = flattened.filter(e => e.label === key2)
          flattened = flattened.filter(e => e.label !== key2)

          flattened.push({
            label: key2,
            Haushaltsbruttoeinkommen: data[key][key2].Haushaltsbruttoeinkommen + search[0].Haushaltsbruttoeinkommen,
            Haushaltsnettoeinkommen: data[key][key2].Haushaltsnettoeinkommen + search[0].Haushaltsnettoeinkommen,
            'Ausgabefaehige Einkommen und Einnahmen': data[key][key2]['Ausgabefaehige Einkommen und Einnahmen'] + search[0]['Ausgabefaehige Einkommen und Einnahmen'],
            'Differenz zu Brutto': data[key][key2]['Differenz zu Brutto'] + search[0]['Differenz zu Brutto'],
            'Sonstige Einnahmen': data[key][key2]['Sonstige Einnahmen'] + search[0]['Sonstige Einnahmen'],
            'Private Konsumausgaben': data[key][key2]['Private Konsumausgaben'] + search[0]['Private Konsumausgaben'],
            'Andere Ausgaben': data[key][key2]['Andere Ausgaben'] + search[0]['Andere Ausgaben'],
          })
        } else if (key2 !== 'Insgesamt') {
          flattened.push({
            label: key2,
            Haushaltsbruttoeinkommen: data[key][key2].Haushaltsbruttoeinkommen,
            Haushaltsnettoeinkommen: data[key][key2].Haushaltsnettoeinkommen,
            'Ausgabefaehige Einkommen und Einnahmen': data[key][key2]['Ausgabefaehige Einkommen und Einnahmen'],
            'Differenz zu Brutto': data[key][key2]['Differenz zu Brutto'],
            'Sonstige Einnahmen': data[key][key2]['Sonstige Einnahmen'],
            'Private Konsumausgaben': data[key][key2]['Private Konsumausgaben'],
            'Andere Ausgaben': data[key][key2]['Andere Ausgaben'],
          })
        }
      })
    })

    const size = Object.keys(data).length

    return flattened.map(group => {
      return {
        label: group.label.replace('Haushalt mit ', ''),
        Haushaltsbruttoeinkommen: group.Haushaltsbruttoeinkommen / size,
        Haushaltsnettoeinkommen: group.Haushaltsnettoeinkommen / size,
        'Ausgabefaehige Einkommen und Einnahmen': group['Ausgabefaehige Einkommen und Einnahmen'] / size,
        'Differenz zu Brutto': group['Differenz zu Brutto'] / size,
        'Sonstige Einnahmen': group['Sonstige Einnahmen'] / size,
        'Private Konsumausgaben': group['Private Konsumausgaben'] / size,
        'Andere Ausgaben': group['Andere Ausgaben'] / size,
      }
    })
  }

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

  const [flattenBy, setFlattenBy] = useState<'year' | 'household'>('year')
  
  return (
    <MainLayout>
      <PieChartZone>
        <StarPlot groups={flattenBy === 'year' ? flattenedByYear(data) : flattenByHousehold(data)} size={400} pad={10} />
      </PieChartZone>

      <TableZone>
        <Table />
      </TableZone>

      <StackedBarChartZone>
        <StackedBarChart groups={flattenBy === 'year' ? flattenedByYear(data) : flattenByHousehold(data)} w={600} h={400} pad={10} />
        Flattened By Year <Switch
          color='default'
          inputProps={{ 'aria-label': 'checkbox with default color' }}
          onChange={() => {
            if (flattenBy === 'year') setFlattenBy('household')
            else setFlattenBy('year')
          }}
        /> Flattened By Household
      </StackedBarChartZone>

      <StreamGraphZone>
        <StreamGraph />
      </StreamGraphZone>

      <StarplotZone>
        <PieChart />
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
