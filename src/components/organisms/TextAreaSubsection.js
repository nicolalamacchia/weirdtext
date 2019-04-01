import React from 'react'
import Subsection from 'components/molecules/Subsection'
import TextArea from 'components/atoms/TextArea'

const TextAreaSubsection = ({ title, subtitle, onChange }) => (
  <Subsection title={title} subtitle={subtitle}>
    <TextArea onChange={onChange} />
  </Subsection>
)

export default TextAreaSubsection
