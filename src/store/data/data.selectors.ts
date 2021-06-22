import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'

const selectDataState = (state: RootState) => state.Data;

export const getData = createSelector(
    selectDataState,
    state => state
)