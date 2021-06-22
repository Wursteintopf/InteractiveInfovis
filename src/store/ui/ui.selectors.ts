import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'

const selectUiState = (state: RootState) => state.Ui;

export const getUiState = createSelector(
  selectUiState,
  state => state
)

export const getSelectedYear = createSelector(
  selectUiState,
  state => state.selectedYear
)