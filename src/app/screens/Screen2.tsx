import React, { useMemo } from 'react'
import { LeftArea, PieChartFull, PieChartSelector, RightArea, Screen2Layout } from './Screen2Styling'
import { Link, useHistory } from 'react-router-dom'
import { convertAngleAndLengthToCoordinates } from '../../util/MathUtil'
import { scaleOrdinal } from 'd3-scale'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedHouseholdSize } from '../../store/ui/ui.selectors'
import { setSelectedHouseholdSize } from '../../store/ui/ui.actions'
import { householdSize } from '../../store/ui/ui.interfaces'

const Screen2: React.FC = () => {
  const history = useHistory()
  const selectedHouseholdSize = useSelector(getSelectedHouseholdSize)
  const dispatch = useDispatch()

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
            <svg viewBox='-200 -200 400 450' width={400} height={450}>
              {
                [0, 1, 2, 3, 4].map(index => {
                  const [x, y] = convertAngleAndLengthToCoordinates(360 / 5 * index, 200)
                  const [nextX, nextY] = convertAngleAndLengthToCoordinates(360 / 5 * (index + 1), 200)

                  return <path key={index} d={'M ' + x + ' ' + y + 'A 200 200 0 0 1 ' + nextX + ' ' + nextY + 'L 0 0'} fill={color(index)} />
                })
              }
              <text transform='translate(0,230)' textAnchor='middle'>{selectedHouseholdSize} Person(en)</text>
              <text transform='translate(80,-50)' textAnchor='middle'>2014</text>
              <text transform='translate(80,50)' textAnchor='middle'>2015</text>
              <text transform='translate(-10,80)' textAnchor='middle'>2016</text>
              <text transform='translate(-80,7)' textAnchor='middle'>2017</text>
              <text transform='translate(-20,-80)' textAnchor='middle'>2019</text>
            </svg>
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
