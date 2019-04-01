import React, { useMemo, useState } from 'react'
import { decode, getWordList } from 'utils/weird-text'

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
    <section>
      <h2>Decoder</h2>
      <h3>Input</h3>
      <h4>Text to decode</h4>
      <textarea onChange={handleTextToDecodeChange} rows="5" />

      <h4>List of the original words that got encoded</h4>
      <div>
        <input onChange={handleUsedWordsChange} type="text" />
      </div>

      <h3>Output</h3>
      <h4>Decoded text</h4>
      <div>{decodedText}</div>
    </section>
  )
}

export default DecodeSection
