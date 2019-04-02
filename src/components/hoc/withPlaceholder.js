import React from 'react'
import styled from 'styled-components'

const isEmpty = text => typeof text !== 'string' || text.trim() === ''

const foregroundColor = ({ theme, isValid }) =>
  isValid ? theme.validTextColor : theme.placeHolderColor

const withStyle = WrappedComponent => styled(WrappedComponent)`
  color: ${foregroundColor};
`

const withPlaceholder = WrappedComponent => ({ text }) => {
  const textOrPlaceholder = isEmpty(text) ? 'Type a valid input...' : text

  const StyledWrappedComponent = withStyle(WrappedComponent)

  return <StyledWrappedComponent isValid={!isEmpty(text)} text={textOrPlaceholder} />
}

export default withPlaceholder
