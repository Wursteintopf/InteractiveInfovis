import actionCreatorFactory from 'typescript-fsa'
import { flattener, householdSize, year } from './ui.interfaces'

const actionCreator = actionCreatorFactory()

export const setFlattenedBy = actionCreator<flattener>('UI_SET_FLATTENED_BY')
export const setSelectedYear = actionCreator<year>('UI_SET_SELECTED_YEAR')
export const setSelectedHouseholdSize = actionCreator<householdSize>('UI_SET_SELECTED_HOUSEHOLD_SIZE')
