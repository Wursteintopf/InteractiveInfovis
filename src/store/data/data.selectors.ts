import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'
import { stack } from 'd3-shape'
import { Group } from './data.interfaces'
import { getHouseholdSizeFromInt } from '../../util/DataUtil'
import { max, merge } from 'd3-array'

const incomeKeys = ['Haushaltsnettoeinkommen', 'Differenz zu Brutto', 'Sonstige Einnahmen']
const expenditureKeys = ['Private Konsumausgaben', 'Andere Ausgaben']

const state = (state: RootState) => state

export const getFullData = createSelector(
  state,
  state => state.Data,
)

const averageByHousehold = (data): Group[] => {
  let flattened: Group[] = []
  Object.keys(data).forEach(key => {
    Object.keys(data[key]).forEach(key2 => {
      if (flattened.filter(e => e.label === key2).length >= 1) {
        const search = flattened.filter(e => e.label === key2)
        flattened = flattened.filter(e => e.label !== key2)

        flattened.push({
          label: key2,
          'Erfasste Haushalte': data[key][key2]['Erfasste Haushalte'] + search[0]['Erfasste Haushalte'],
          Haushaltsbruttoeinkommen: data[key][key2].Haushaltsbruttoeinkommen + search[0].Haushaltsbruttoeinkommen,
          Haushaltsnettoeinkommen: data[key][key2].Haushaltsnettoeinkommen + search[0].Haushaltsnettoeinkommen,
          'Ausgabefaehige Einkommen und Einnahmen': data[key][key2]['Ausgabefaehige Einkommen und Einnahmen'] + search[0]['Ausgabefaehige Einkommen und Einnahmen'],
          'Differenz zu Brutto': data[key][key2]['Differenz zu Brutto'] + search[0]['Differenz zu Brutto'],
          'Sonstige Einnahmen': data[key][key2]['Sonstige Einnahmen'] + search[0]['Sonstige Einnahmen'],
          'Private Konsumausgaben': data[key][key2]['Private Konsumausgaben'] + search[0]['Private Konsumausgaben'],
          'Andere Ausgaben': data[key][key2]['Andere Ausgaben'] + search[0]['Andere Ausgaben'],
        })
      } else if (key2 !== 'Insgesamt') {
        flattened.push({
          label: key2,
          'Erfasste Haushalte': data[key][key2]['Erfasste Haushalte'],
          Haushaltsbruttoeinkommen: data[key][key2].Haushaltsbruttoeinkommen,
          Haushaltsnettoeinkommen: data[key][key2].Haushaltsnettoeinkommen,
          'Ausgabefaehige Einkommen und Einnahmen': data[key][key2]['Ausgabefaehige Einkommen und Einnahmen'],
          'Differenz zu Brutto': data[key][key2]['Differenz zu Brutto'],
          'Sonstige Einnahmen': data[key][key2]['Sonstige Einnahmen'],
          'Private Konsumausgaben': data[key][key2]['Private Konsumausgaben'],
          'Andere Ausgaben': data[key][key2]['Andere Ausgaben'],
        })
      }
    })
  })

  const size = Object.keys(data).length

  return flattened.map(group => {
    return {
      label: group.label.replace('Haushalt mit ', ''),
      'Erfasste Haushalte': group['Erfasste Haushalte'] / size,
      Haushaltsbruttoeinkommen: group.Haushaltsbruttoeinkommen / size,
      Haushaltsnettoeinkommen: group.Haushaltsnettoeinkommen / size,
      'Ausgabefaehige Einkommen und Einnahmen': group['Ausgabefaehige Einkommen und Einnahmen'] / size,
      'Differenz zu Brutto': group['Differenz zu Brutto'] / size,
      'Sonstige Einnahmen': group['Sonstige Einnahmen'] / size,
      'Private Konsumausgaben': group['Private Konsumausgaben'] / size,
      'Andere Ausgaben': group['Andere Ausgaben'] / size,
    }
  })
}

const averageByYear = (data): Group[] => {
  return Object.keys(data).map(key => {
    return {
      label: key,
      'Erfasste Haushalte': data[key].Insgesamt['Erfasste Haushalte'],
      Haushaltsbruttoeinkommen: data[key].Insgesamt.Haushaltsbruttoeinkommen,
      Haushaltsnettoeinkommen: data[key].Insgesamt.Haushaltsnettoeinkommen,
      'Ausgabefaehige Einkommen und Einnahmen': data[key].Insgesamt['Ausgabefaehige Einkommen und Einnahmen'],
      'Differenz zu Brutto': data[key].Insgesamt['Differenz zu Brutto'],
      'Sonstige Einnahmen': data[key].Insgesamt['Sonstige Einnahmen'],
      'Private Konsumausgaben': data[key].Insgesamt['Private Konsumausgaben'],
      'Andere Ausgaben': data[key].Insgesamt['Andere Ausgaben'],
    }
  })
}

const specificYear = (data, year): Group[] => {
  return Object.keys(data[year]).filter(e => e !== 'Insgesamt').map(key => {
    return {
      label: key.replace('Haushalt mit ', ''),
      'Erfasste Haushalte': data[year][key]['Erfasste Haushalte'],
      Haushaltsbruttoeinkommen: data[year][key].Haushaltsbruttoeinkommen,
      Haushaltsnettoeinkommen: data[year][key].Haushaltsnettoeinkommen,
      'Ausgabefaehige Einkommen und Einnahmen': data[year][key]['Ausgabefaehige Einkommen und Einnahmen'],
      'Differenz zu Brutto': data[year][key]['Differenz zu Brutto'],
      'Sonstige Einnahmen': data[year][key]['Sonstige Einnahmen'],
      'Private Konsumausgaben': data[year][key]['Private Konsumausgaben'],
      'Andere Ausgaben': data[year][key]['Andere Ausgaben'],
    }
  })
}

const specificHousehold = (data, household): Group[] => {
  const householdSize = getHouseholdSizeFromInt(household)
  return Object.keys(data).map(key => {
    return {
      label: key,
      'Erfasste Haushalte': data[key][householdSize]['Erfasste Haushalte'],
      Haushaltsbruttoeinkommen: data[key][householdSize].Haushaltsbruttoeinkommen,
      Haushaltsnettoeinkommen: data[key][householdSize].Haushaltsnettoeinkommen,
      'Ausgabefaehige Einkommen und Einnahmen': data[key][householdSize]['Ausgabefaehige Einkommen und Einnahmen'],
      'Differenz zu Brutto': data[key][householdSize]['Differenz zu Brutto'],
      'Sonstige Einnahmen': data[key][householdSize]['Sonstige Einnahmen'],
      'Private Konsumausgaben': data[key][householdSize]['Private Konsumausgaben'],
      'Andere Ausgaben': data[key][householdSize]['Andere Ausgaben'],
    }
  })
}

export const getFlattenedData = createSelector(
  state,
  state => {
    const flattenedBy = state.Ui.flattenBy
    const currentScreen = state.Ui.currentScreen
    const selectedYear = state.Ui.selectedYear
    const selectedHouseholdSize = state.Ui.selectedHouseholdSize
    
    if (currentScreen === 1 && flattenedBy === 'year') return averageByYear(state.Data)
    else if (currentScreen === 1 && flattenedBy === 'household') return averageByHousehold(state.Data)
    else if (currentScreen === 2 && flattenedBy === 'year') return specificYear(state.Data, selectedYear)
    else if (currentScreen === 2 && flattenedBy === 'household') return specificHousehold(state.Data, selectedHouseholdSize)
    else return []
  },
)

export const getStackedIncomeData = createSelector(
  getFlattenedData,
  state => {
    return stack().keys(incomeKeys)(state)
  },
)

export const getStackedExpenditureData = createSelector(
  getFlattenedData,
  state => {
    return stack().keys(expenditureKeys)(state)
  },
)

export const getMaxValue = createSelector(
  getFlattenedData,
  state => {
    return (max(merge(state.map(group => [group.Haushaltsnettoeinkommen + group['Differenz zu Brutto'] + group['Sonstige Einnahmen'], group['Private Konsumausgaben'] + group['Andere Ausgaben']]))))
  },
)
