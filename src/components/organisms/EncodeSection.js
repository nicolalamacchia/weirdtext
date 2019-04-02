import React, { useMemo, useState } from 'react'
import Section from 'components/atoms/Section'
import Heading from 'components/atoms/Heading'
import TextAreaSubsection from 'components/organisms/TextAreaSubsection'
import PreTextSubsection from 'components/organisms/PreTextSubsection'
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

      <PreTextSubsection title="Output" subtitle="Encoded text" text={encodedText} />

      <PreTextSubsection
        subtitle="List of the original words that got encoded"
        text={processedWords.join(' ')}
      />
    </Section>
  )
}

export default EncodeSection
