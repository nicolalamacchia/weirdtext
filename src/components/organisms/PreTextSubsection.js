import React from 'react'
import styled from 'styled-components'
import Subsection from 'components/molecules/Subsection'
import PreformattedText from 'components/atoms/PreformattedText'
import withPlaceholder from 'components/hoc/withPlaceholder'
import withError from 'components/hoc/withError'

const PreText = ({ text, ...props }) => <PreformattedText {...props}>{text}</PreformattedText>

const foregroundColor = ({ theme, isValid, hasError, ...props }) => {
  // prettier-ignore
  return hasError ? theme.errorColor : (isValid ? theme.validTextColor : theme.placeholderColor)
}

const StyledPreText = styled(PreText)`
  color: ${foregroundColor};
`

const WrappedPreText = withError(withPlaceholder(StyledPreText))

const PreTextSubsection = ({ title, subtitle, text, error }) => (
  <Subsection title={title} subtitle={subtitle}>
    <WrappedPreText text={text} error={error} />
  </Subsection>
)

export default PreTextSubsection
