import React, { useMemo, useState } from 'react'
import { decode, getWordList } from 'utils/weird-text'
import Section from 'components/atoms/Section'
import Heading from 'components/atoms/Heading'
import WordListInput from 'components/molecules/WordListInput'
import TextAreaSubsection from 'components/organisms/TextAreaSubsection'
import PreformattedTextSubsection from 'components/organisms/PreformattedTextSubsection'

const DecodeSection = () => {
  const [textToDecode, setTextToDecode] = useState('')
  const [usedWords, setUsedWords] = useState([])

  const getDecodedText = (textToDecode, usedWords) => {
    try {
      return decode(textToDecode, usedWords)
    } catch (err) {
      console.error(err)
      return ''
    }
  }

  const decodedText = useMemo(() => getDecodedText(textToDecode, usedWords), [
    textToDecode,
    usedWords,
  ])

  const handleUsedWordsChange = event => {
    const text = event.currentTarget.value

    setUsedWords(getWordList(text))
  }

  const handleTextToDecodeChange = event => {
    const text = event.currentTarget.value

    setTextToDecode(text.trim())
  }

  return (
    <Section>
      <Heading level="2">Decoder</Heading>

      <TextAreaSubsection
        title="Input"
        subtitle="Text to decode"
        onChange={handleTextToDecodeChange}
      />

      <WordListInput
        title="List of the original words that got encoded"
        onChange={handleUsedWordsChange}
      />

      <PreformattedTextSubsection title="Output" subtitle="Decoded text" text={decodedText} />
    </Section>
  )
}

export default DecodeSection
