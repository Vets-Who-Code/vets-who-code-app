import PropTypes from 'prop-types'

function Loader({ isSubmitted, jobData }) {
  return (
    <>
      {isSubmitted && !jobData?.error && !jobData?.results && (
        <div className="loading">
          <div className="ball first"></div>
          <div className="ball second"></div>
          <div className="ball third"></div>
        </div>
      )}
    </>
  )
}

Loader.propTypes = {
  isSubmitted: PropTypes.bool,
  jobData: PropTypes.object,
}

export default Loader
