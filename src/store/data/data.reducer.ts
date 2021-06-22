import { reducerWithInitialState } from 'typescript-fsa-reducers'
import {DataState} from "~store/data/data.interfaces";
import {data} from "../../../data/data"

const INITIAL_STATE: DataState = data

export const DataReducer = reducerWithInitialState(INITIAL_STATE)