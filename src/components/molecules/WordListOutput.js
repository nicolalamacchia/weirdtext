import React from 'react'
import Heading from 'components/atoms/Heading'
import PreWithPlaceholder from 'components/molecules/PreWithPlaceholder'

const WordListInput = ({ title, words }) => (
  <React.Fragment>
    <Heading level="4">{title}</Heading>
    <PreWithPlaceholder text={words.join(' ')} />
  </React.Fragment>
)

export default WordListInput
