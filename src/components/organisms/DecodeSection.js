import React, { useMemo, useState } from 'react'
import Section from 'components/atoms/Section'
import Heading from 'components/atoms/Heading'
import InputSubsection from 'components/organisms/InputSubsection'
import TextAreaSubsection from 'components/organisms/TextAreaSubsection'
import PreTextSubsection from 'components/organisms/PreTextSubsection'
import { decode, getWordList } from 'utils/weird-text'

/**
 * The tokenization part of the following regex should be less granular
 * (or, at most, as granular as) the tokenization regex used in `getWordList`
 */
const validateWordsText = text => /^(?:\w{4,}\s*)+$/.test(text)

const DecodeSection = () => {
  const [textToDecode, setTextToDecode] = useState('')
  const [error, setError] = useState(null)
  const [usedWords, setUsedWords] = useState([])

  const getDecodedText = (textToDecode, usedWords) => {
    try {
      const decodedText = decode(textToDecode, usedWords)
      setError(null)
      return decodedText
    } catch (err) {
      setError(err.message)
      return ''
    }
  }

  const decodedText = useMemo(() => getDecodedText(textToDecode, usedWords), [
    textToDecode,
    usedWords,
  ])

  const handleUsedWordsChange = event => {
    const text = event.currentTarget.value

    if (!validateWordsText(text)) {
      setError('Invalid input: words can contain only letters and numbers (at least four)')
    } else {
      // getWordList might be an overkill, but enforces the right tokenization
      setUsedWords(getWordList(text))
    }
  }

  const handleTextToDecodeChange = event => {
    const text = event.currentTarget.value

    setTextToDecode(text.trim())
  }

  /**
   * TODO: show a warning if ambiguities are detected, using `weirdDistinct`
   * on the word list and comparing its length to the original word list length:
   * if there are ambiguities, the weirdDistinct'ed list will be shorter
   */
  return (
    <Section>
      <Heading level="2">Decoder</Heading>

      <TextAreaSubsection
        title="Input"
        subtitle="Text to decode"
        onChange={handleTextToDecodeChange}
      />

      <InputSubsection
        subtitle="List of the original words that got encoded"
        onChange={handleUsedWordsChange}
      />

      <PreTextSubsection title="Output" subtitle="Decoded text" text={decodedText} error={error} />
    </Section>
  )
}

export default DecodeSection
