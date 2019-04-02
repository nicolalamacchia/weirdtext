import styled from 'styled-components'

const withBaseInputStyle = WrappedComponent => styled(WrappedComponent)`
  background-color: ${({ theme }) => theme.inputBgColor};
  border: 1px solid ${({ theme }) => theme.borderColor};
  font-size: 1em;
  width: 100%;
`

export default withBaseInputStyle
