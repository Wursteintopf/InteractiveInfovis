import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'

const selectUiState = (state: RootState) => state.Ui

export const getUiState = createSelector(
  selectUiState,
  state => state,
)

export const getFlattenedBy = createSelector(
  selectUiState,
  state => state.flattenBy,
)

export const getSelectedYear = createSelector(
  selectUiState,
  state => state.selectedYear,
)

export const getSelectedHouseholdSize = createSelector(
  selectUiState,
  state => state.selectedHouseholdSize,
)

export const getCurrentScreen = createSelector(
  selectUiState,
  state => state.currentScreen,
)

export const getHighlightedAttributes = createSelector(
  selectUiState,
  state => state.highlights,
)

export const getChannel = createSelector(
  selectUiState,
  state => state.channel,
)

export const getZoom = createSelector(
  selectUiState,
  state => state.zoom,
)
