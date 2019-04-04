import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils, { act } from 'react-dom/test-utils'
import EncodeSection from 'components/organisms/EncodeSection'

let container

const setValue = (element, value) => {
  element.value = value
  act(() => {
    ReactTestUtils.Simulate.change(element);
  })
}

beforeEach(() => {
  container = document.createElement('div')
  document.body.appendChild(container)
})

afterEach(() => {
  document.body.removeChild(container)
  container = null
})

describe('EncodeSection', () => {
  test('Initial output', () => {
    act(() => {
      ReactDOM.render(<EncodeSection />, container)
    })
    // the first `pre` node (encoded output)
    const pre = container.querySelector('pre');
    expect(pre.textContent).toBe('Type a valid input...')
  })

  test('Encode', () => {
    act(() => {
      ReactDOM.render(<EncodeSection />, container)
    })

    const textarea = container.querySelector('textarea');
    const pre = container.querySelector('pre');

    setValue(textarea, 'hey')
    expect(pre.textContent).toBe('hey')

    setValue(textarea, 'test')
    expect(pre.textContent).toBe('tset')

    setValue(textarea, 'testing')
    expect(pre.textContent[0]).toBe('t')
    expect(pre.textContent.slice(-1)).toBe('g')
    expect(pre.textContent.length).toBe(7)
    expect(pre.textContent).not.toBe('testing')
  })
})
