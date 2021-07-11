import React, { useMemo } from 'react'
import { LeftArea, PieChartFull, PieChartSelector, RightArea, Screen2Layout } from './Screen2Styling'
import { Link, useHistory } from 'react-router-dom'
import { convertAngleAndLengthToCoordinates } from '../../util/MathUtil'
import { scaleOrdinal } from 'd3-scale'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedHouseholdSize } from '../../store/ui/ui.selectors'
import { setSelectedHouseholdSize } from '../../store/ui/ui.actions'
import { householdSize } from '../../store/ui/ui.interfaces'
import NightingaleRoseChart from '../Components/Visualizations/PieChart'
import { getFlattenedData } from '../../store/data/data.selectors'

const Screen2: React.FC = () => {
  const selectedHouseholdSize = useSelector(getSelectedHouseholdSize)
  const dispatch = useDispatch()
  const flattenedData = useSelector(getFlattenedData)

  const color = useMemo(() => {
    return scaleOrdinal().domain([0, 1, 2, 3, 4, 5]).range(['#e41a1c', '#377eb8', '#4daf4a', '#ff00ff', '#ffff00'])
  }, [])

  const sizeArray: householdSize[] = [1, 2, 3, 4, 5]

  return (
    <Screen2Layout>
      <LeftArea>
        <PieChartSelector>
          {
            sizeArray.map(index => {
              return (
                <svg 
                  key={index} 
                  width={200} 
                  height={250} 
                  onClick={() => {
                    dispatch(setSelectedHouseholdSize(index))
                  }}
                >
                  <circle cx={100} cy={100} r={100} fill={selectedHouseholdSize === index ? 'red' : 'black'} />
                  <text transform='translate(100,230)' textAnchor='middle'>{index} Person(en)</text>
                </svg>
              )
            })
          }
        </PieChartSelector>
        <PieChartFull>
          <Link to='/screen3'>
            <NightingaleRoseChart size={600} groups={flattenedData} pad={10} />
          </Link>
        </PieChartFull>
      </LeftArea>
      <RightArea>
        Lorem Ipsum
      </RightArea>
    </Screen2Layout>
  )
}

export default Screen2
