import React from 'react'
import PropTypes from 'prop-types'

import PageHeader from '../components/PageHeader'

function DisabledPage({ pageContext }) {
  const { page } = pageContext
  return (
    <>
      <PageHeader title={page} />
      <section id="our_missions" className="section pad-regular bg-light our_missions">
        <div className="container">
          <div className="row">
            <div className="featured-heading text-center">
              <h2 className="dark_color">
                <h2>The {page} is disabled by default</h2>
              </h2>
            </div>
            <div className="col-sm-12 our_mission_content text-center">
              <blockquote>
                <p>
                  If you need to develop this page please refer to <strong>README.md</strong>
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

DisabledPage.propTypes = {
  pageContext: PropTypes.shape({
    page: PropTypes.string,
  }),
}

export default DisabledPage
