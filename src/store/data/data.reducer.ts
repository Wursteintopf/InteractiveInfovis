import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { data } from '../../../data/data'
import { DataState } from './data.interfaces'

const INITIAL_STATE: DataState = data

export const DataReducer = reducerWithInitialState(INITIAL_STATE)
