// TODO: use shallow renderer
// TODO: add snapshot testing

import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils, { act } from 'react-dom/test-utils'
import DecodeSection from 'components/organisms/DecodeSection'

let container
let textarea
let input
let pre

const placeHolderText = 'Type a valid input...'
const wordLengthsErr =
  'Invalid input: encoded text and original words are not compatible (different number of words)'
const invalidCharsErr = 'Invalid input: words can contain only letters and numbers (at least four)'

const setValue = (element, value) => {
  element.value = value
  act(() => {
    ReactTestUtils.Simulate.change(element)
  })
}

beforeEach(() => {
  container = document.createElement('div')
  act(() => {
    ReactDOM.render(<DecodeSection />, container)
  })
  document.body.appendChild(container)
  textarea = container.querySelector('textarea')
  input = container.querySelector('input')
  pre = container.querySelector('pre')
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe('DecodeSection', () => {
  test('Initial output', () => {
    expect(pre.textContent).toBe(placeHolderText)
  })

  test('Decode input', () => {
    setValue(textarea, 'my daer frnied, tlel me a sroty')
    expect(pre.textContent).toBe(wordLengthsErr)

    setValue(input, 'foobar')
    expect(pre.textContent).toBe(wordLengthsErr)

    setValue(input, 'foo')
    expect(pre.textContent).toBe(invalidCharsErr)

    setValue(input, '...')
    expect(pre.textContent).toBe(invalidCharsErr)

    setValue(textarea, 'my daer frnied, tlel me a sroty')
    setValue(input, 'dear friend story tell')
    expect(pre.textContent).toBe('my dear friend, tell me a story')
  })
})
