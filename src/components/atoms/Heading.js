import React from 'react'
import styled, { css } from 'styled-components'

const fontSize = ({ level }) => `${0.75 + 1.25 / level}em`

const style = css`
  font-weight: bold;
  font-size: ${fontSize};
  margin: 0.75em 0;
`

const H = ({ level, children, theme, ...props }) =>
  React.createElement(`h${level}`, props, children)

const Header = styled(H)`
  ${style}
`

export default Header
