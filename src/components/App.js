import React from 'react'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import MainPage from 'components/pages/MainPage'
import theme from 'components/theme'

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

const App = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle />
      <MainPage />
    </React.Fragment>
  </ThemeProvider>
)

export default App
