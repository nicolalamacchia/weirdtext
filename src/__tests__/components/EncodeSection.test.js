// TODO: use shallow renderer
// TODO: add snapshot testing

import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils, { act } from 'react-dom/test-utils'
import EncodeSection from 'components/organisms/EncodeSection'

let container
let textarea
// the first `pre` node (encoded output)
let preEnc
// the second `pre` node (list of words that have been encoded)
let preWords

const placeHolderText = 'Type a valid input...'

const setValue = (element, value) => {
  element.value = value
  act(() => {
    ReactTestUtils.Simulate.change(element)
  })
}

beforeEach(() => {
  container = document.createElement('div')
  act(() => {
    ReactDOM.render(<EncodeSection />, container)
  })
  document.body.appendChild(container)
  textarea = container.querySelector('textarea')
  preEnc = container.querySelector('pre')
  preWords = container.querySelectorAll('pre')[1]
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe('EncodeSection', () => {
  test('Initial output', () => {
    expect(preEnc.textContent).toBe(placeHolderText)
    expect(preWords.textContent).toBe(placeHolderText)
  })

  test('Encoded text', () => {
    setValue(textarea, 'hey')
    expect(preEnc.textContent).toBe('hey')

    setValue(textarea, 'test')
    expect(preEnc.textContent).toBe('tset')

    setValue(textarea, 'testing')
    expect(preEnc.textContent[0]).toBe('t')
    expect(preEnc.textContent.slice(-1)).toBe('g')
    expect(preEnc.textContent.length).toBe(7)
    expect(preEnc.textContent).not.toBe('testing')
  })

  test('Encoded words', () => {
    setValue(textarea, 'hey')
    expect(preWords.textContent).toBe(placeHolderText)

    setValue(textarea, 'my dear friend, tell me a story')
    expect(preWords.textContent).toBe('dear friend story tell')
  })
})
