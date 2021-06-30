export interface Household {
    'Erfasste Haushalte': number
    'Hochgerechnete Haushalte': number
    'Haushaltsbruttoeinkommen': number
    'Haushaltsnettoeinkommen': number
    'Ausgabefaehige Einkommen und Einnahmen': number
    'Private Konsumausgaben': number
    'Andere Ausgaben': number
}

export interface Year {
    'Haushalt mit 1 Person': Household
    'Haushalt mit 2 Personen': Household
    'Haushalt mit 3 Personen': Household
    'Haushalt mit 4 Personen': Household
    'Haushalt mit 5 und mehr Personen': Household
}

export interface DataState {
    2014: Year
    2015: Year
    2016: Year
    2017: Year
    2019: Year
}
