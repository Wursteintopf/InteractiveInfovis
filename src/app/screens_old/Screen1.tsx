import React from 'react'
import { BottomHalf, Header, HeaderArea, PieChartArea, Screen1Layout, UpperHalf } from './Screen1Styling'
import { Link, useHistory } from 'react-router-dom'
import { householdSize } from '../../store/ui/ui.interfaces'
import { setSelectedHouseholdSize } from '../../store/ui/ui.actions'
import { useDispatch, useSelector } from 'react-redux'
import { getSelectedHouseholdSize } from '../../store/ui/ui.selectors'

const Screen1: React.FC = () => {
  const sizeArray: householdSize[] = [1, 2, 3, 4, 5]
  const selectedHouseholdSize = useSelector(getSelectedHouseholdSize)
  const dispatch = useDispatch()
  const history = useHistory()

  return (
    <Screen1Layout>
      <UpperHalf>
        <HeaderArea>
          <Header>
            Income and Receipts in Germany
          </Header>
          <PieChartArea>
            {
              sizeArray.map(index => {
                return (
                  <svg
                    key={index}
                    width={200}
                    height={250}
                    onClick={() => {
                      dispatch(setSelectedHouseholdSize(index))
                      history.push('/screen2')
                    }}
                  >
                    <circle cx={100} cy={100} r={100} />
                    <text transform='translate(100,230)' textAnchor='middle'>{index} Person(en)</text>
                  </svg>
                )
              })
            }
          </PieChartArea>
        </HeaderArea>

      </UpperHalf>
      <BottomHalf>Lorem Ipsum</BottomHalf>
    </Screen1Layout>
  )
}

export default Screen1
