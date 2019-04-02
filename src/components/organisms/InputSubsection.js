import React from 'react'
import Subsection from 'components/molecules/Subsection'
import Input from 'components/atoms/Input'

const WordListInput = ({ subtitle, onChange }) => (
  <Subsection subtitle={subtitle}>
    <Input onChange={onChange} type="text" />
  </Subsection>
)

export default WordListInput
