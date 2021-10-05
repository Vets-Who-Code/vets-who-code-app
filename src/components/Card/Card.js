import PropTypes from 'prop-types'
import './card.css'

function Card({ jobData }) {
  const isDataPresent = field => {
    return typeof field === 'string' ? field : false
  }

  const removeHTML = text => {
    return text.replace(/<[^>]*(>|$)|&nbsp;|&zwnj;|&raquo;|&laquo;|&bull;|&gt;/g, '')
  }

  const isValidURL = string => {
    return !string
      ? false
      : string.match(
          // eslint-disable-next-line no-useless-escape
          /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i
        )
  }

  const title = removeHTML(isDataPresent(jobData.title))
  const company = removeHTML(isDataPresent(jobData.company.display_name))
  const location = removeHTML(isDataPresent(jobData.location.display_name))
  const description = removeHTML(isDataPresent(jobData.description))
  const redirectUrl = isValidURL(isDataPresent(jobData.redirect_url))
  const date = Date.parse(removeHTML(jobData.created))
    ? new Date(removeHTML(jobData.created)).toLocaleDateString()
    : false
  const valid = date && title && company && location && description && redirectUrl ? true : false

  return (
    valid && (
      <div className="panel panel-default">
        <div className="panel-body">
          <h4>{title}</h4>
          <p className="company">Company: {company}</p>
          <p className="location">Location: {location}</p>
          <p className="description">Job Description: {description}</p>
          <div className="panel-bottom">
            <p className="date">Date Posted: {date}</p>
            <a
              className="btn btn-charity-default"
              href={redirectUrl}
              aria-label="Open URL to apply"
              target="_blank"
              rel="noopener noreferrer"
            >
              Apply
            </a>
          </div>
        </div>
      </div>
    )
  )
}

Card.propTypes = {
  jobData: PropTypes.shape({
    created: PropTypes.string,
    title: PropTypes.string,
    company: PropTypes.object,
    location: PropTypes.object,
    description: PropTypes.string,
    // eslint-disable-next-line camelcase
    redirect_url: PropTypes.string,
  }),
}

export default Card
