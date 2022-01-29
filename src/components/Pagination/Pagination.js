import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import './pagination.css'

function Pagination({ pageContext, type, path }) {
  let { currentPage, totalPages, minPage, maxPage, formData, formResponse } = pageContext
  let eachPage = 0

  const apiPageChange = value => {
    if (value !== currentPage) {
      return formData(formResponse, value)
    }
  }

  const maxPageFn = clicked => {
    if (clicked === 'More') {
      if (maxPage + 10 > totalPages) {
        return totalPages
      } else {
        return maxPage + 10
      }
    }
    return maxPage + clicked
  }

  const direction = value => {
    const clicked = value.target.innerText === 'More' ? 10 : -10
    pageContext.setPageContext({
      currentPage: currentPage,
      totalPages: totalPages,
      minPage: minPage + clicked,
      maxPage: maxPageFn(clicked),
      setPageContext: pageContext.setPageContext,
      formResponse: formResponse,
      formData: formData,
    })
  }

  if (type === 'route') {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          margin: '0 auto',
        }}
      >
        <nav aria-label="Page navigation">
          <ul className="pagination m-20">
            {currentPage > 1 && (
              <li>
                <Link to={`/${path}/${currentPage === 2 ? '' : currentPage - 1}`} rel="prev">
                  <span aria-hidden="true">Previous</span>
                </Link>
              </li>
            )}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={eachPage++}>
                <Link to={`/${path}/${index === 0 ? '' : index + 1}`}>{index + 1}</Link>
              </li>
            ))}
            {currentPage < totalPages && (
              <li>
                <Link to={`/${path}/${currentPage + 1}`} rel="next">
                  <span aria-hidden="true">Next</span>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    )
  }
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        margin: '0 auto',
      }}
    >
      <div className="pagination-container">
        <nav aria-label="Page navigation">
          <ul className="pagination">
            {minPage > 9 && (
              <li>
                <span
                  aria-hidden="true"
                  onKeyPress={direction}
                  onClick={direction}
                  style={{ cursor: 'pointer' }}
                  tabIndex="0"
                  role="button"
                >
                  Previous
                </span>
              </li>
            )}
            {Array.from({ length: maxPage - minPage }, (_, index) => (
              <li
                key={eachPage++}
                style={index + 1 + minPage > totalPages ? { display: 'none' } : {}}
              >
                <span
                  tabIndex="0"
                  onClick={() => apiPageChange(index + 1 + minPage)}
                  onKeyPress={() => apiPageChange(index + 1 + minPage)}
                  style={
                    index + 1 + minPage === currentPage
                      ? { background: '#eee' }
                      : { cursor: 'pointer' }
                  }
                  className={`${index + 1 + minPage === totalPages ? 'last-pagination-card' : ''}`}
                  role="dialog"
                >
                  {index + 1 + minPage}
                </span>
              </li>
            ))}
            {maxPage <= totalPages && totalPages > 9 && (
              <li>
                <span
                  aria-hidden="true"
                  onClick={direction}
                  style={{ cursor: 'pointer' }}
                  tabIndex="0"
                  role="button"
                  onKeyPress={direction}
                >
                  More
                </span>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </div>
  )
}

Pagination.propTypes = {
  pageContext: PropTypes.shape({
    limit: PropTypes.number,
    skip: PropTypes.number,
    isFirstPage: PropTypes.bool,
    isLastPage: PropTypes.bool,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number,
    contentfulData: PropTypes.object,
    minPage: PropTypes.number,
    maxPage: PropTypes.number,
    formData: PropTypes.func,
    formResponse: PropTypes.object,
    setPageContext: PropTypes.func,
  }),
  type: PropTypes.string,
  path: PropTypes.string,
}

export default Pagination
