import styled from 'styled-components'

const withBaseInputStyle = WrappedComponent => styled(WrappedComponent)`
  background-color: ${props => props.theme.inputBgColor};
  border: 1px solid ${props => props.theme.borderColor};
  font-size: 1em;
  width: 100%;
`

export default withBaseInputStyle
