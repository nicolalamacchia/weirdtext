// TODO: use shallow renderer
// TODO: add snapshot testing

import React from 'react'
import ReactTestUtils, { renderIntoDocument } from 'react-dom/test-utils'
import App from 'components/App'

describe('App', () => {
  test('Render the main app without crashing', () => {
    renderIntoDocument(<App />)
  })
})
