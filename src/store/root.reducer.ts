import { combineReducers } from 'redux'
import { DataState } from './data/data.interfaces'
import { UiState } from './ui/ui.interfaces'
import { DataReducer } from './data/data.reducer'
import { UiReducer } from './ui/ui.reducer'

export interface RootState {
    Data: DataState
    Ui: UiState
}

export const rootReducer = combineReducers<RootState>({
  Data: DataReducer,
  Ui: UiReducer,
})
