import PageHeader from '../components/PageHeader'
import SEO from '../components/SEO'
import { ContactForm } from '../components/Forms'

function Contact() {
  return (
    <>
      <SEO title="Contact Us" />
      <PageHeader />
      <section id="contact" className="small-top-pad section bg-default">
        <div className="container">
          <div className="row">
            <div className="col-md-12 lead-in">
              <h1 className="story-title">Contact Us</h1>
              <p>
                <i>Please complete the form for additional information.</i>
              </p>
            </div>
            <div className="row">
              <div className="col-xs-12"></div>
            </div>
            <div className="container">
              <div className="row">
                <div className="contact-form"></div>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
