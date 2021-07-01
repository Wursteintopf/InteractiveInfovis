import { reducerWithInitialState } from 'typescript-fsa-reducers'
import { data } from '../../../data/data'
import { DataState } from './data.interfaces'

const enrichData = (data: DataState) => {
  Object.keys(data).forEach(key => {
    Object.keys(data[key]).forEach(key2 => {
      data[key][key2]['Sonstige Einnahmen'] = data[key][key2]['Ausgabefaehige Einkommen und Einnahmen'] - data[key][key2].Haushaltsnettoeinkommen
      data[key][key2]['Differenz zu Brutto'] = data[key][key2].Haushaltsbruttoeinkommen - data[key][key2].Haushaltsnettoeinkommen
    })
  })

  return data
}

const INITIAL_STATE: DataState = enrichData(data)

export const DataReducer = reducerWithInitialState(INITIAL_STATE)
