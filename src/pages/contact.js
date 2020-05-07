import React from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import GoogleMap, { createMarker } from '../components/GoogleMap'
import { ContactForm, onSubmitSuccess, onSubmitError } from '../components/Forms'

function Contact() {
  return (
    <Layout>
      <PageHeader title="contact us" />
      <section id="contact" className="pad-regular section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="contactus-brief">
                <h3>Contact Us</h3>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-12 clearfix">
              <GoogleMap createMarker={createMarker} />
            </div>
          </div>
        </div>
      </section>

      <section id="contact-form" className="section bg-default default-section-padding">
        <div className="container">
          <div className="row">
            <div className="contact-form"></div>
            <ContactForm />
          </div>
        </div>
      </section>
      <section id="call-to-action-small" className="call-to-action-small">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h3>
                Help Us Teach More Veterans How To Code &nbsp;{' '}
                <a className="btn btn-charity-default" href="/donate">
                  DONATE{' '}
                </a>{' '}
              </h3>{' '}
            </div>{' '}
          </div>{' '}
        </div>{' '}
      </section>
    </Layout>
  )
}

export default Contact
