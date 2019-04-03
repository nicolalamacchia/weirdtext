/** @module weird-text/helpers */

/**
 * (Durstenfeld-Knuth-)Fisher-Yates shuffle.
 * This is way faster than using a split-sort(random)-join one-liner.
 * Time complexity: O(n)
 * @function
 * @private
 * @param {string} str - The string to shuffle
 * @return {string} The shuffled string
 */
const shuffle = str => {
  let arr = Array.from(str)

  // shuffle the array in-place
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))

    // the following line is a little slower than using a temporary variable
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }

  return arr.join('')
}

/**
 * Helper to sort strings.
 * @function
 * @private
 * @param {string} str - The string to sort
 * @return {string} The sorted string
 */
const sortString = str =>
  str
    .split('')
    .sort(localeCompareSort)
    .join('')

/**
 * Check whether all the characters of `word` are the same.
 * @function
 * @static
 * @param {string} word - The word to test
 * @return {boolean} The test result
 */
const areAllCharsEqual = word => /^(.)\1*$/.test(word)

/**
 * Return the central part of a word.
 * @function
 * @static
 * @param {string} word - The input word
 * @param {number} [padding=1] - How far from word boundaries
 * @return {string} The central part of the word
 */
const getWordCenter = (word, padding = 1) => word.slice(padding, -padding)

/**
 * Weirdify words.
 * @function
 * @static
 * @param {string} word - The word to weirdify
 * @return {string} The weirdified word
 */
const weirdifyWord = word => {
  if (word.length <= 3) {
    return word
  }

  // if all the characters of the middle section are the same, return the unchanged word
  const middle = getWordCenter(word)
  if (areAllCharsEqual(middle)) {
    return word
  }

  let weirdified = word
  while (weirdified === word) {
    const shuffled = shuffle(middle)
    weirdified = `${word[0]}${shuffled}${word.slice(-1)}`
  }

  return weirdified
}

/**
 * Sorting function helper to perform a case insensitive comparison of strings.
 * This uses a function to compare international words (e.g.: with accents).
 * @function
 * @static
 * @see {@link https://mdn.io/String.prototype.localeCompare|localeCompare}
 * @see {@link https://mdn.io/Intl.Collator|Intl.Collator (less supported)}
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const localeCompareSort = (a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' })

/**
 * Sorting function based on the weird-text criteria.
 * The input is sorted based on both string extremes and its sorted middle part.
 * @function
 * @static
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const weirdSort = (a, b) => {
  // return the input string with just the middle part sorted
  const middleSorted = str => `${str[0]}${sortString(getWordCenter(str))}${str.slice(-1)}`

  return localeCompareSort(middleSorted(a), middleSorted(b))
}

/**
 * Return a RegExp pattern of words in logical OR starting from an array.
 * @function
 * @static
 * @param {string[]} wordList - Array of words
 * @return {RegExp} RegExp pattern with `gi` flags
 */
const getReplacePattern = wordList => new RegExp(wordList.join('|'), 'gi')

/**
 * Return whether one string is a possible encoded version of the other.
 * @function
 * @static
 * @param {string} str1
 * @param {string} str2
 * @return {number}
 */
const areStrCompatible = (str1, str2) =>
  // prettier-ignore
  str1.length === str2.length
  && str1[0] === str2[0]
  && str1.slice(-1) === str2.slice(-1)
  && str1.slice(-1) === str2.slice(-1)
  && sortString(str1) === sortString(str2)

export {
  areAllCharsEqual,
  areStrCompatible,
  getWordCenter,
  localeCompareSort,
  weirdSort,
  getReplacePattern,
  weirdifyWord,
}
