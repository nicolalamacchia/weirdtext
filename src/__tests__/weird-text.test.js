import { encode } from 'utils/weird-text'

test('Encode a string', () => {
  expect(encode('hey').encodedText).toBe('hey')
  expect(encode('ciao').encodedText).toBe('caio')
})
