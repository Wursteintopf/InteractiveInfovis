import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { UiState } from './ui.interfaces'
import { changeScreen, resetUiState, setFlattenedBy, setSelectedHouseholdSize, setSelectedYear } from './ui.actions'

const INITIAL_STATE: UiState = {
  flattenBy: 'year',
  selectedHouseholdSize: 1,
  selectedYear: 2014,
  currentScreen: 1,
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
  .case(resetUiState, () => INITIAL_STATE)
  .case(changeScreen, (state, payload) => {
    return {
      ...state,
      currentScreen: payload,
    }
  })
