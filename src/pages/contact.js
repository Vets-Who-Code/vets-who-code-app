import React from 'react'
import PageHeader from '../components/PageHeader'
import { ContactForm } from '../components/Forms'

function Contact() {
  return (
    <>
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
          <div className="container">
            <div className="row">
              <div className="contact-form"></div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
