import React from 'react'
import PropTypes from 'prop-types'

function FormAlert({ errorMessage }) {
  return (
    <div className="alert alert-danger" role="alert">
      <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
      <span className="sr-only">Error:</span> {errorMessage || 'Field is required'}
    </div>
  )
}

FormAlert.propTypes = {
  errorMessage: PropTypes.string,
}

export default FormAlert
