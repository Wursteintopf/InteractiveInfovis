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
