import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { UiState } from './ui.interfaces'
import {
  toggleHighlightedAttribute,
  changeScreen,
  resetUiState,
  setFlattenedBy,
  setSelectedHouseholdSize,
  setSelectedYear, setZoom,
} from './ui.actions'

const INITIAL_STATE: UiState = {
  flattenBy: 'year',
  selectedHouseholdSize: 1,
  selectedYear: 2014,
  currentScreen: 1,
  highlights: [],
  channel: new BroadcastChannel('remote'),
  zoom: [0, 5000],
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
  .case(toggleHighlightedAttribute, (state, payload) => {
    if (state.highlights.includes(payload)) {
      return {
        ...state,
        highlights: state.highlights.filter(e => e !== payload),
      }
    } else {
      return {
        ...state,
        highlights: [...state.highlights, payload],
      }
    }
  })
  .case(setZoom, (state, payload) => {
    return {
      ...state,
      zoom: payload,
    }
  })
