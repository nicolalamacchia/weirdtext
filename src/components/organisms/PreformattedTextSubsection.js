import React from 'react'
import Subsection from 'components/molecules/Subsection'
import PreformattedText from 'components/atoms/PreformattedText'

const PreformattedTextSubsection = ({ title, subtitle, text }) => (
  <Subsection title={title} subtitle={subtitle}>
    <PreformattedText>{text}</PreformattedText>
  </Subsection>
)

export default PreformattedTextSubsection
