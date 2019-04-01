import React from 'react'
import styled from 'styled-components'
import Heading from 'components/atoms/Heading'

const StyledHeader = styled.header`
  border-bottom: 1px solid ${props => props.theme.borderColor};
  margin-top: 2.5em;
`

const Header = ({ children }) => (
  <StyledHeader>
    <Heading level="1">{children}</Heading>
  </StyledHeader>
)

export default Header
