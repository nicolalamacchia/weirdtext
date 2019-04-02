import React from 'react'

const withPlaceholder = WrappedComponent => ({ text, ...props }) => {
  const isEmpty = text => typeof text !== 'string' || text.trim() === ''

  const textOrPlaceholder = isEmpty(text) ? 'Type a valid input...' : text

  return <WrappedComponent isValid={!isEmpty(text)} text={textOrPlaceholder} {...props} />
}

export default withPlaceholder
