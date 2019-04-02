import React from 'react'
import Subsection from 'components/molecules/Subsection'
import PreformattedText from 'components/atoms/PreformattedText'
import withPlaceholder from 'components/hoc/withPlaceholder'

const Pre = ({ text, className }) => (
  <PreformattedText className={className}>{text}</PreformattedText>
)

const TextWithPlaceholder = withPlaceholder(Pre)

const PreformattedTextSubsection = ({ title, subtitle, text }) => (
  <Subsection title={title} subtitle={subtitle}>
    <TextWithPlaceholder text={text} />
  </Subsection>
)

export default PreformattedTextSubsection
