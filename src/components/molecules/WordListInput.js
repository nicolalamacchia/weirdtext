import React from 'react'
import Heading from 'components/atoms/Heading'
import Input from 'components/atoms/Input'

const WordListInput = ({ title, onChange }) => (
  <React.Fragment>
    <Heading level="4">{title}</Heading>
    <Input onChange={onChange} type="text" />
  </React.Fragment>
)

export default WordListInput
