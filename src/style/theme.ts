const colors = ['#1487C2', '#28BCCA', '#C9D93B', '#FEA82A', '#D08AC0']

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
