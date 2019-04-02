import styled from 'styled-components'

const whiteSpace = ({ wrap }) => (wrap ? 'pre-wrap' : 'initial')

const PreformattedText = styled.pre`
  font-family: sans-serif;
  font-size: 1em;
  overflow-x: auto;
  padding: 0.3em 0;
  white-space: ${whiteSpace};
`

export default PreformattedText
