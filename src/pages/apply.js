import React from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import { ApplyForm, onSubmitSuccess, onSubmitError } from '../components/Forms'

export default function Apply() {
  return (
    <Layout>
      <PageHeader title="apply" />
      <section id="contact" className="pad-regular section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-xs-12">
              <div className="contactus-brief">
                <h3>Apply</h3>
                <p className="section-description">
                  Thank you for choosing to apply to Vets Who Code. Your first step in this journey
                  will be to visit our &nbsp;
                  <a href="https://github.com/Vets-Who-Code/prework">prework repository</a>
                  &nbsp;on <a href="http://github.com">Github.com</a>. We ask that, prior to
                  applying to our program, you complete a small series of tutorial assignments that
                  will introduce you to the basics of HTML, CSS and Javascript. The prework reading
                  assignment will also guide you through setting up your development environment to
                  work with the Vets Who Code program. After finishing the reading, we ask that you
                  complete the capstone project &nbsp;(a short, one-page website which will allow us
                  to gauge your initial skill-level and help us to assign an appropriate mentor),
                  and fill out the following application form.
                </p>
                <ApplyForm />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="call-to-action-small" className="call-to-action-small">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 text-center">
              <h3>
                Help Us Teach More Veterans How To Code &nbsp;
                <a className="btn btn-charity-default" href="/donate">
                  DONATE
                </a>
              </h3>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}
