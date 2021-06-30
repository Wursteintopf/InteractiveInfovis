import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { UiState } from './ui.interfaces'

const INITIAL_STATE: UiState = {
  selectedYear: 2014,
}

export const UiReducer = reducerWithInitialState(INITIAL_STATE)
