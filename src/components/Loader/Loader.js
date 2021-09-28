import PropTypes from 'prop-types'
import './loader.css'

function Loader({ isSubmitted, jobData }) {
  return (
    <div className={`loading ${isSubmitted && !jobData?.results ? '' : 'hidden'}`}>
      <div className="ball first"></div>
      <div className="ball second"></div>
      <div className="ball third"></div>
    </div>
  )
}

Loader.propTypes = {
  isSubmitted: PropTypes.bool,
  jobData: PropTypes.object,
}

export default Loader
