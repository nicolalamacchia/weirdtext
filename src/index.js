import React from 'react'
import ReactDOM from 'react-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import EncodeSection from 'components/EncodeSection'
import DecodeSection from 'components/DecodeSection'

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    padding: 0;
    margin: 0;
    background-color: ${props => props.theme.bgColor};
  }
`

const Skin = styled.main`
  color: ${props => props.theme.fgColor};
  font-family: sans-serif;
  margin: auto;
  max-width: 600px;
`

const Header = styled.h1``

const theme = {
  bgColor: '#fafafa',
  fgColor: '#444',
}

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Skin>
        <GlobalStyle />

        <Header>WeirdText</Header>

        <EncodeSection />

        <DecodeSection />
      </Skin>
    </ThemeProvider>
  )
}

const rootElement = document.getElementById('root')

ReactDOM.render(<App />, rootElement)
