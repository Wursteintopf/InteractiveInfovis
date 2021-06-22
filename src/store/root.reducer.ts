import { combineReducers } from 'redux'
import {DataState} from "~store/data/data.interfaces";
import {DataReducer} from "~store/data/data.reducer";
import {UiState} from "~store/ui/ui.interfaces";
import {UiReducer} from "~store/ui/ui.reducer";

export interface RootState {
    Data: DataState
    Ui: UiState
}

export const rootReducer = combineReducers<RootState>({
    Data: DataReducer,
    Ui: UiReducer
})