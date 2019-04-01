import React from 'react'
import Heading from 'components/atoms/Heading'
import Input from 'components/atoms/Input'

const WordListInput = ({ title, words }) => (
  <React.Fragment>
    <Heading level="4">{title}</Heading>
    <p>{words.join(' ')}</p>
  </React.Fragment>
)

export default WordListInput
