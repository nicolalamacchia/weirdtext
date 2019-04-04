import { encode, decode, getWordList } from 'utils/weird-text'

test('Encode a string', () => {
  expect(encode('hey').encodedText).toBe('hey')
  expect(encode('ciao').encodedText).toBe('caio')

  let encodedWow = encode('wooooow').encodedText
  expect(encodedWow).toBe('wooooow')

  let encodedHello = encode('hello').encodedText
  expect(encodedHello).not.toBe('hello')
  expect(encodedHello[0]).toBe('h')
  expect(encodedHello.slice(-1)).toBe('o')
})

test('Decode a string', () => {
  let inputText
  let inputWords
  let expectedOutput
  let decodedText

  inputText = 'hlelo my daer firend'
  inputWords = ['dear', 'friend', 'hello']
  expectedOutput = 'hello my dear friend'
  decodedText = decode(inputText, inputWords)
  expect(decodedText).toBe(expectedOutput)

  inputText = 'My bset ferind is Nmaoi, or Nomai. No mbaye Nmoai.'
  inputWords = ['best', 'friend', 'maybe', 'Naomi', 'Noami']
  expectedOutput = 'My best friend is Naomi, or Naomi. No maybe Naomi.'
  decodedText = decode(inputText, inputWords)
  expect(decodedText).toBe(expectedOutput)

  inputText = 'hello my dear friend'
  inputWords = ['friend', 'hello']
  expect(() => {
    decode(inputText, inputWords)
  }).toThrowError(
    /Invalid input: encoded text and original words are not compatible \(different number of words\)/,
  )
})

test('Get word list from text', () => {
  let inputText
  let expectedOutput
  let wordList

  inputText = 'Hello my dear friend string2integer'
  expectedOutput = ['dear', 'friend', 'Hello', 'string2integer']
  wordList = getWordList(inputText)
  expect(wordList).toEqual(expectedOutput)

  expectedOutput = ['dear', 'friend', 'Hello', 'integer', 'string']
  wordList = getWordList(inputText, /[a-z]+/gi)
  expect(wordList).toEqual(expectedOutput)

  inputText = '... --- ```'
  expectedOutput = []
  wordList = getWordList(inputText)
  expect(wordList).toEqual(expectedOutput)
})
