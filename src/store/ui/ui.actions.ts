import actionCreatorFactory from 'typescript-fsa'
import { attribute, currentScreen, flattener, householdSize, year } from './ui.interfaces'

const actionCreator = actionCreatorFactory()

export const setFlattenedBy = actionCreator<flattener>('UI_SET_FLATTENED_BY')
export const setSelectedYear = actionCreator<year>('UI_SET_SELECTED_YEAR')
export const setSelectedHouseholdSize = actionCreator<householdSize>('UI_SET_SELECTED_HOUSEHOLD_SIZE')
export const resetUiState = actionCreator<void>('UI_RESET_STATE')
export const changeScreen = actionCreator<currentScreen>('UI_CHANGE_SCREEN')
export const toggleHighlightedAttribute = actionCreator<attribute>('UI_TOGGLE_HIGHLIGHTED_ATTRIBUTE')
export const setZoom = actionCreator<[number, number]>('UI_SET_ZOOM')
export const resetZoom = actionCreator<void>('UI_RESET_ZOOM')
