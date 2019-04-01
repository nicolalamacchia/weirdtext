import React from 'react'
import Heading from 'components/atoms/Heading'

const Subsection = ({ title, subtitle, children }) => {
  return (
    <React.Fragment>
      <Heading level="3">{title}</Heading>
      <Heading level="4">{subtitle}</Heading>
      {children}
    </React.Fragment>
  )
}

export default Subsection
