import React from 'react'

const withError = WrappedComponent => ({ error, text, ...props }) => {
  const hasError = typeof error === 'string' && error !== ''

  const textOrError = hasError ? error : text

  return <WrappedComponent hasError={hasError} text={textOrError} {...props} />
}

export default withError
