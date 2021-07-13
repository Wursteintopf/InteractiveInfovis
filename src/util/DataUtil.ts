import { attribute } from '../store/ui/ui.interfaces'

export const getHouseholdSizeFromInt = (int: number): string => {
  switch (int) {
    case 1:
      return 'Haushalt mit 1 Person'
    case 2:
      return 'Haushalt mit 2 Personen'
    case 3:
      return 'Haushalt mit 3 Personen'
    case 4:
      return 'Haushalt mit 4 Personen'
    case 5:
      return 'Haushalt mit 5 und mehr Personen'
  }
  return ''
}

export const getAttributeFromString = (key: string): attribute => {
  if (key === 'Differenz zu Brutto') {
    return 'Haushaltsbruttoeinkommen'
  } else if (key === 'Sonstige Einnahmen') {
    return 'Ausgabefaehige Einkommen und Einnahmen'
  } else {
    return key as attribute
  }
}
