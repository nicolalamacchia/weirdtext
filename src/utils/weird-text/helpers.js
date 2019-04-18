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

  const shuffled = arr.sort((a, b) => 0.5 - Math.random()).join('')

  return shuffled !== str ? shuffled : shuffle(str)
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
 * @return {string} The central part of the word
 */
const getWordCenter = word => word.slice(1, -1)

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

  // no need to shuffle the word, this is the only way to satisfy weird-text's criteria
  if (word.length === 4) {
    return `${word[0]}${word[2]}${word[1]}${word[3]}`
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
 * Return an array with unique values from an input array.
 * @function
 * @static
 * @param {Array} arr
 * @return {Array}
 */
const distinct = arr => [...new Set(arr)]

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
 * String sorting function based on weird-text's criteria.
 * The input is sorted based on both its extremes being kept fixed and its sorted middle part.
 * @param {string} str
 * @return {string}
 */
const middleSorted = str => `${str[0]}${sortString(getWordCenter(str))}${str.slice(-1)}`

/**
 * Sorting function based on weird-text's criteria.
 * @see middleSort
 * @function
 * @static
 * @param {string} a
 * @param {string} b
 * @return {number}
 */
const weirdSort = (a, b) => {
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
 * Return an array stripped of ambiguous words.
 * Only one word per an ambiguous group of words is kept. The first one
 * in weird-text order.
 * @see weirdSort
 * @example
 * weirdDistinct(['foobar', 'foboar'])
 * // returns ['foboar']
 * @param {string[]} arr
 */
const weirdDistinct = arr =>
  arr.sort(weirdSort).reduce((filtered, curr) => {
    return middleSorted(curr) !== middleSorted(filtered.slice(-1)[0] || '')
      ? [...filtered, curr]
      : [...filtered]
  }, [])

/**
 * Generate a regex to match weirdified words e.g.: 'hello' -> `/h[ell]{3}o/g`.
 * @param {string} word - word on wich the regex will be based
 * @return {RegExp}
 */
const weirdMatchRegExp = word => {
  const wordCenter = getWordCenter(word)
  const pattern = `${word[0]}[${wordCenter}]{${wordCenter.length}}${word.slice(-1)}`
  return new RegExp(pattern, 'g')
}

export {
  areAllCharsEqual,
  getWordCenter,
  localeCompareSort,
  weirdSort,
  getReplacePattern,
  distinct,
  middleSorted,
  weirdifyWord,
  weirdDistinct,
  weirdMatchRegExp,
}
