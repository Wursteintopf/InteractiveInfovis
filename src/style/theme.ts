const colors = ['#1487C2', '#28BCCA', '#C9D93B', '#FEA82A', '#D08AC0']
const mutedColors = ['#a1dfff', '#a4f7ff', '#f7ffae', '#fcdfb5', '#fde8f8']

export const getColorByKey = (key: string) => {
  switch (key) {
    case 'Haushaltsnettoeinkommen':
      return colors[0]
    case 'Haushaltsbruttoeinkommen':
      return colors[1]
    case 'Differenz zu Brutto':
      return colors[1]
    case 'Ausgabefaehige Einkommen und Einnahmen':
      return colors[2]
    case 'Sonstige Einnahmen':
      return colors[2]
    case 'Private Konsumausgaben':
      return colors[3]
    case 'Andere Ausgaben':
      return colors[4]
  }
}

export const getMutedColorByKey = (key: string) => {
  switch (key) {
    case 'Haushaltsnettoeinkommen':
      return mutedColors[0]
    case 'Haushaltsbruttoeinkommen':
      return mutedColors[1]
    case 'Differenz zu Brutto':
      return mutedColors[1]
    case 'Ausgabefaehige Einkommen und Einnahmen':
      return mutedColors[2]
    case 'Sonstige Einnahmen':
      return mutedColors[2]
    case 'Private Konsumausgaben':
      return mutedColors[3]
    case 'Andere Ausgaben':
      return mutedColors[4]
  }
}
