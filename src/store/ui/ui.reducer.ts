import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { UiState } from './ui.interfaces'
import { setFlattenedBy, setSelectedHouseholdSize, setSelectedYear } from './ui.actions'

const INITIAL_STATE: UiState = {
  flattenBy: 'year',
  selectedHouseholdSize: 1,
  selectedYear: 2014,
}

export const UiReducer = reducerWithInitialState(INITIAL_STATE)
  .case(setFlattenedBy, (state, payload) => {
    return {
      ...state,
      flattenBy: payload,
    }
  })
  .case(setSelectedYear, (state, payload) => {
    return {
      ...state,
      selectedYear: payload,
    }
  })
  .case(setSelectedHouseholdSize, (state, payload) => {
    return {
      ...state,
      selectedHouseholdSize: payload,
    }
  })
