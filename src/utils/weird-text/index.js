/** @module weird-text */

import {
  areAllCharsEqual,
  areStrCompatible,
  getWordCenter,
  localeCompareSort,
  getReplacePattern,
  weirdSort,
  weirdifyWord,
} from './helpers'

/**
 * Return a list of words satisfying the weird-text criteria from an input text.
 * To match also numbers within words, `wordPattern` should be `/[a-z0-9]+/gi`.
 * It is possible to use a more detailed pattern to match other characters,
 * for example this pattern will match all the latin letters: `/[A-Za-zÀ-ÖØ-öø-ÿ]+/giu`.
 * @function
 * @static
 * @param {string} text - The input text
 * @param {RexExp} [wordPattern=/[a-z]+/gi] - Pattern to match words
 * @return {string[]} Words to be weirdified
 */
const getWordList = (text, wordPattern = /[a-z]+/gi) =>
  // array sorted in a case insensitive way (see the sorting function documentation for details)
  [
    // do not include duplicates
    ...new Set(
      // create an array of words matching `wordPattern`
      (text.match(wordPattern) || []).filter(
        // filter out words with the central part containing only repeated characters and short words
        word => !areAllCharsEqual(getWordCenter(word)) && word.length > 3,
      ),
    ),
  ].sort(localeCompareSort)

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
  const invalidInputError = reason =>
    new Error(`Invalid input: encoded text and original words are not compatible (${reason})`)

  const encodedWordList = getWordList(text)
  // loose sanity check
  if (encodedWordList.length !== wordList.length) {
    throw invalidInputError('different number of words')
  }
  const sortedOrigWordList = wordList.sort(weirdSort)
  const sortedEncodedWordList = encodedWordList.sort(weirdSort)

  let decodedText = text

  for (let i = 0; i < sortedEncodedWordList.length; i += 1) {
    // word-level sanity check
    if (!areStrCompatible(sortedOrigWordList[i], sortedEncodedWordList[i])) {
      throw invalidInputError('some words are not compatible')
    }

    decodedText = decodedText.replace(
      new RegExp(sortedEncodedWordList[i], 'g'),
      sortedOrigWordList[i],
    )
  }

  return decodedText
}

export { encode, decode, getWordList }
