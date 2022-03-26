import PropTypes from 'prop-types'
import Link from 'next/link'

function Pagination({
  currentPage,
  totalPages,
  minPage,
  maxPage,
  nextPage,
  prevPage,
  isFirstPage,
  isLastPage,
  type,
  path,
  handleUpatePaginationValues,
  updatePaginationData,
}) {
  let eachPage = 0

  const apiPageChange = value => {
    updatePaginationData(value)
  }

  const direction = value => {
    const clicked = value.target.innerText === 'More' ? 10 : -10
    handleUpatePaginationValues(clicked)
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
            {!isFirstPage && (
              <li>
                <Link href={`${prevPage}`} rel="prev">
                  <a>
                    <span aria-hidden="true">Previous</span>
                  </a>
                </Link>
              </li>
            )}
            {totalPages > 1 &&
              Array.from({ length: totalPages }, (_, index) => (
                <li key={eachPage++}>
                  <Link href={`/${path}/${index + 1}`}>
                    <a>{index + 1}</a>
                  </Link>
                </li>
              ))}
            {!isLastPage && (
              <li>
                <Link href={`${nextPage}`} rel="next">
                  <a>
                    <span aria-hidden="true">Next</span>
                  </a>
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
                onClick={() => apiPageChange(index + 1 + minPage)}
                onKeyPress={() => apiPageChange(index + 1 + minPage)}
              >
                <span
                  tabIndex="0"
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
  currentPage: PropTypes.string,
  isFirstPage: PropTypes.bool,
  isLastPage: PropTypes.bool,
  totalPages: PropTypes.number,
  prevPage: PropTypes.string,
  nextPage: PropTypes.string,
  type: PropTypes.string,
  path: PropTypes.string,
  handleUpatePaginationValues: PropTypes.func,
  updatePaginationData: PropTypes.func,
}

export default Pagination
