import { createSelector } from 'reselect'
import { RootState } from '../root.reducer'
import { Group } from '../../app/Components/Visualizations/VisualizationInterfaces'

const state = (state: RootState) => state

export const getFullData = createSelector(
  state,
  state => state.Data,
)

const flattenByHousehold = (data) => {
  let flattened: Group[] = []
  Object.keys(data).forEach(key => {
    Object.keys(data[key]).forEach(key2 => {
      if (flattened.filter(e => e.label === key2).length >= 1) {
        const search = flattened.filter(e => e.label === key2)
        flattened = flattened.filter(e => e.label !== key2)

        flattened.push({
          label: key2,
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

const flattenedByYear = (data) => {
  return Object.keys(data).map(key => {
    return {
      label: key,
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

export const getFlattenedData = createSelector(
  state,
  state => {
    const flattenedBy = state.Ui.flattenBy

    if (flattenedBy === 'year') return flattenedByYear(state.Data)
    else return flattenByHousehold(state.Data)
  },
)
