import React from 'react'
import PropTypes from 'prop-types'
import Heading from 'components/atoms/Heading'

const Subsection = ({ title, subtitle, children }) => {
  return (
    <React.Fragment>
      {title && title.trim() !== '' && <Heading level="3">{title}</Heading>}
      <Heading level="4">{subtitle}</Heading>
      {children}
    </React.Fragment>
  )
}

Subsection.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
}

export default Subsection
