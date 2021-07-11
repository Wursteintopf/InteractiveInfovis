import styled from '@emotion/styled'

export const ScreenLayout = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 20px 1fr 1fr 1fr 1fr 1fr 1fr 20px;
  grid-template-rows: 20px 100px 1fr 1fr 1fr 1fr 1fr 1fr 20px;
`

export const HeaderArea = styled.div`
  grid-column: 2 / 8;
  grid-row: 2 / 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Header = styled.h1`
  font-weight: 300;
`

export const RoseChartArea = styled.div`
  grid-column: 2 / 4;
  grid-row: 3 / 7;
`

export const StackedAreaGraphArea = styled.div`
  grid-column: 2 / 4;
  grid-row: 7 / 9;
`

export const LineChartArea = styled.div`
  grid-column: 6 / 8;
  grid-row: 3 / 9;
`

export const StarPlotArea = styled.div`
  grid-column: 4 / 6;
  grid-row: 6 / 9;
`

export const StackedBarChartArea = styled.div`
  grid-column: 4 / 6;
  grid-row: 3 / 6;
`
