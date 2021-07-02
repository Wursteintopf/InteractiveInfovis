import { css } from '@emotion/react'

export const globalStyles = css`
  * {
    box-sizing: border-box;
  }
  
  html {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  
  body {
    height: 100%;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  
  a {
    text-decoration: none;
    &:hover,
    &:focus,
    &:active {
      text-decoration: none;
      outline: 0;
    }
  }
`
