import styled from '@emotion/styled'
import { css } from '@emotion/react'

export const LegendBox = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`

export const LegendRow = styled.div`
  display: flex;
  font-size: 12px;
  margin-bottom: 3px;
`

export const ColorBox = styled.div<{ colorOfTheBox?: string }>`
  width: 16px;
  height: 16px;
  margin-right: 10px;
  
  ${props => css`
    background-color: ${props.colorOfTheBox};
  `}
`
