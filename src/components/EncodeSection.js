import React, { useMemo, useState } from 'react'
import { encode } from 'utils/weird-text'

const EncodeSection = () => {
  const [textToEncode, setTextToEncode] = useState('')
  const { encodedText, processedWords } = useMemo(() => encode(textToEncode), [textToEncode])

  const handleTextToEncodeChange = event => {
    const text = event.currentTarget.value

    setTextToEncode(text.trim())
  }

  return (
    <section>
      <h2>Encoder</h2>
      <h3>Input</h3>
      <h4>Text to encode</h4>
      <textarea onChange={handleTextToEncodeChange} rows="5" />

      <h3>Output</h3>
      <h4>Encoded text</h4>
      <div>{encodedText}</div>

      <h4>List of the original words that got encoded</h4>
      <div>{processedWords.join(' ')}</div>
    </section>
  )
}

export default EncodeSection
