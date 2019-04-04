/**
 * This module implements a space-efficient (for the human) way to encode and decode
 * text using a weird-text logic. Since there might be ambiguities (for example between
 * 'foobar' and 'foboar') which are impossible to restore correctly without a deep
 * analysis of the context (that might not be always available anyway), the implemented
 * algorithm will not try to guess when decoding an encoded text.
 * @module weird-text
 */

import {
  areAllCharsEqual,
  getWordCenter,
  localeCompareSort,
  getReplacePattern,
  distinct,
  weirdifyWord,
  weirdDistinct,
  weirdMatchRegExp,
} from './helpers'

/**
 * Return a list of words satisfying the weird-text criteria from an input text.
 * It is possible to use a more detailed pattern to match other characters,
 * for example this pattern will match all the latin letters: `/[A-Za-zÀ-ÖØ-öø-ÿ]+/giu`.
 * @function
 * @static
 * @param {string} text - The input text
 * @param {RexExp} [wordPattern=/\w+/gi] - Pattern to match words
 * @return {string[]} Words to be weirdified
 */
const getWordList = (text, wordPattern = /\w+/gi) => {
  // create an array of words matching `wordPattern`
  const words = (text.match(wordPattern) || []).filter(
    // filter out words with the central part containing only repeated characters and short words
    word => !areAllCharsEqual(getWordCenter(word)) && word.length > 3,
  )
  // do not include duplicates (array sorted in a case insensitive way)
  return distinct(words).sort(localeCompareSort)
}

/**
 * Encode the input text.
 * @function
 * @static
 * @param {string} text - Text to encode
 * @return {Object} Object with `weirdifiedText` and `weirdifiedWords` fields
 */
const encode = text => {
  const wordList = getWordList(text)
  const replacePattern = getReplacePattern(wordList)
  return {
    encodedText: text.replace(replacePattern, weirdifyWord),
    processedWords: wordList,
  }
}

/**
 * Decode the input text.
 * @function
 * @static
 * @param {string} text - Text to decode
 * @param {string[]} wordList - Array of original words that are weirdified in `text`
 * @return {string} Decoded text
 */
const decode = (text, wordList) => {
  const invalidInputError = reason => new Error(`Invalid input: ${reason}`)

  const distinctEncodedWords = weirdDistinct(getWordList(text))
  const distinctOriginalWords = weirdDistinct(wordList)

  // loose sanity check
  if (distinctEncodedWords.length !== distinctOriginalWords.length) {
    throw invalidInputError(
      'encoded text and original words are not compatible (different number of words)',
    )
  }

  let decodedText = text

  distinctOriginalWords.forEach(word => {
    const wordMatchRegExp = weirdMatchRegExp(word)
    decodedText = decodedText.replace(wordMatchRegExp, word)
  })

  return decodedText
}

export { encode, decode, getWordList }
