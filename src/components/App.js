import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import MainPage from 'components/pages/MainPage'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    background-color: ${props => props.theme.bgColor};
    font-size: 1rem;
    margin: 0;
    padding: 0;
  }
`

const theme = {
  bgColor: '#fafafa',
  borderColor: '#d5d5d5',
  fgColor: '#444',
  inputBgColor: '#fefefe',
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle />
        <MainPage />
      </React.Fragment>
    </ThemeProvider>
  )
}

export default App
