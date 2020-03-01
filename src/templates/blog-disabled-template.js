import React from 'react'

import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'

function BlogDisabled() {
  return (
    <Layout>
      <PageHeader title="blog" />
      <section id="our_missions" className="section pad-regular bg-light our_missions">
        <div className="container">
          <div className="row">
            <div className="featured-heading text-center">
              <h2 className="dark_color">
                <h2>Blog is disabled by default</h2>
              </h2>
            </div>
            <div className="col-sm-12 our_mission_content text-center">
              <blockquote>
                <p>
                  If you need to develop the blog please refer to <strong>README.md</strong>
                </p>
              </blockquote>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
export default BlogDisabled
