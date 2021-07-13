export type flattener = 'year' | 'household'
export type year = 2014 | 2015 | 2016 | 2017 | 2019
export type householdSize = 1 | 2 | 3 | 4 | 5
export type currentScreen = 1 | 2
export type attribute = 'Erfasste Haushalte' | 'Haushaltsbruttoeinkommen' | 'Haushaltsnettoeinkommen' | 'Ausgabefaehige Einkommen und Einnahmen' | 'Private Konsumausgaben' | 'Andere Ausgaben'

export interface UiState {
  flattenBy: flattener
  selectedYear: year
  selectedHouseholdSize: householdSize
  currentScreen: currentScreen
  highlights: attribute[]
  channel: BroadcastChannel
}
