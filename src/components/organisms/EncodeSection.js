import React, { useMemo, useState } from 'react'
import Section from 'components/atoms/Section'
import Heading from 'components/atoms/Heading'
import WordListOutput from 'components/molecules/WordListOutput'
import TextAreaSubsection from 'components/organisms/TextAreaSubsection'
import PreformattedTextSubsection from 'components/organisms/PreformattedTextSubsection'
import { encode } from 'utils/weird-text'

const EncodeSection = () => {
  const [textToEncode, setTextToEncode] = useState('')
  const { encodedText, processedWords } = useMemo(() => encode(textToEncode), [textToEncode])

  const handleTextToEncodeChange = event => {
    const text = event.currentTarget.value

    setTextToEncode(text.trim())
  }

  return (
    <Section>
      <Heading level="2">Encoder</Heading>

      <TextAreaSubsection
        title="Input"
        subtitle="Text to encode"
        onChange={handleTextToEncodeChange}
      />

      <PreformattedTextSubsection title="Output" subtitle="Encoded text" text={encodedText} />

      <WordListOutput title="List of the original words that got encoded" words={processedWords} />
    </Section>
  )
}

export default EncodeSection
