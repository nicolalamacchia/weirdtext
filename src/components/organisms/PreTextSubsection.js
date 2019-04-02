import React from 'react'
import Subsection from 'components/molecules/Subsection'
import PreformattedText from 'components/atoms/PreformattedText'
import withPlaceholder from 'components/hoc/withPlaceholder'

// className is needed to style the component through a HOC
const PreText = ({ text, className }) => (
  <PreformattedText className={className}>{text}</PreformattedText>
)

const PreWithPlaceHolder = withPlaceholder(PreText)

const PreTextSubsection = ({ title, subtitle, text }) => (
  <Subsection title={title} subtitle={subtitle}>
    <PreWithPlaceHolder text={text} />
  </Subsection>
)

export default PreTextSubsection
