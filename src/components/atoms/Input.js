import styled from 'styled-components'
import withBaseInputStyle from 'components/hoc/withBaseInputStyle'

const Input = styled.input`
  min-height: 2.5em;
  padding: 0 0.6em;
`

export default withBaseInputStyle(Input)
