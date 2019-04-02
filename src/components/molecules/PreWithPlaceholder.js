import React from 'react'
import PreformattedText from 'components/atoms/PreformattedText'
import withPlaceholder from 'components/hoc/withPlaceholder'

const Pre = ({ text, className }) => (
  <PreformattedText className={className}>{text}</PreformattedText>
)

const PreWithPlaceholder = withPlaceholder(PreformattedText)

export default PreWithPlaceholder
