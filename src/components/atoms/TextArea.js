import styled from 'styled-components'
import withBaseInputStyle from 'components/hoc/withBaseInputStyle'

const backgroundColor = ({
  disabled,
  theme
}) => disabled ? theme.bgColor : theme.inputBgColor

const TextArea = styled.textarea`
  background-color: ${backgroundColor};
  font-family: sans-serif;
  min-height: 7.5em;
  padding: 0.6em;
  resize: vertical;
  width: 100%;
`

export default withBaseInputStyle(TextArea)
