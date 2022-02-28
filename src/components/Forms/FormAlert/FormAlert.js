import { FaExclamationCircle } from 'react-icons/fa'
import PropTypes from 'prop-types'

function FormAlert({ errorMessage }) {
  return (
    <div className="alert alert-danger" role="alert">
      <FaExclamationCircle aria-hidden="true" />
      <span className="sr-only">Error:</span> {errorMessage || 'Field is required'}
    </div>
  )
}

FormAlert.propTypes = {
  errorMessage: PropTypes.string,
}

export default FormAlert
