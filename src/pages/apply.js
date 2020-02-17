import React, { Component } from 'react'
import Layout from '../components/Layout'
import PageHeader from '../components/PageHeader'
import { FormValidator } from '../components/FormValidator'

export default class Apply extends Component {
  constructor() {
    super()

    this.validator = new FormValidator([
      {
        field: 'firstName',
        method: 'isEmpty',
        validWhen: false,
        message: 'First Name is required'
      },
      {
        field: 'lastName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Last Name is required'
      },
      {
        field: 'email',
        method: 'isEmpty',
        validWhen: false,
        message: 'Email is required'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'Not a valid email.'
      },
      {
        field: 'city',
        method: 'isEmpty',
        validWhen: false,
        message: 'City is required'
      },
      {
        field: 'country',
        method: 'isEmpty',
        validWhen: false,
        message: 'Country is required'
      },
      {
        field: 'branchOfService',
        method: 'isEmpty',
        validWhen: false,
        message: 'Branch of Service is required'
      },
      {
        field: 'yearJoined',
        method: 'isEmpty',
        validWhen: false,
        message: 'Year Joined is required'
      },
      {
        field: 'yearSeparated',
        method: 'isEmpty',
        validWhen: false,
        message: 'Year Separated is required'
      },
      {
        field: 'twitterAccountName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Twitter account is required'
      },
      {
        field: 'linkedinAccountName',
        method: 'isEmpty',
        validWhen: false,
        message: 'LinkedIn account is required'
      },
      {
        field: 'githubAccountName',
        method: 'isEmpty',
        validWhen: false,
        message: 'Github account is required'
      },
      {
        field: 'preworkLink',
        method: 'isEmpty',
        validWhen: false,
        message: 'Prework Hosting Link is required'
      },
      {
        field: 'preworkRepo',
        method: 'isEmpty',
        validWhen: false,
        message: 'Prework Repo Link is required'
      }
    ])
  }

  state = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    branchOfService: '',
    yearJoined: '',
    yearSeparated: '',
    twitterAccountName: '',
    linkedinAccountName: '',
    githubAccountName: '',
    preworkLink: '',
    preworkRepo: '',
    formHeading: 'Apply',
    loading: false,
    formSuccess: false,
    formError: false,
    message: (<span>
      Thank you for choosing to apply to Vets Who Code.
      Your first step in this journey will be to visit our
      &nbsp;<a href="https://github.com/Vets-Who-Code/prework">prework repository</a>
      &nbsp;on <a href="http://github.com">Github.com</a>.<br /><br />
      We ask that, prior to applying to our program, you complete a small series of
      tutorial assignments that will introduce you to the basics of HTML, CSS and
      Javascript.<br /><br />
      The prework reading assignment will also guide you through setting up your
      development environment to work with the Vets Who Code program.<br /><br />
      After finishing the reading, we ask that you complete the capstone project
      &nbsp;(a short, one-page website which will allow us to gauge your initial
      skill-level and help us to assign an appropriate mentor), and fill out the
      following application form.
    </span>)
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  resetForm = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    branchOfService: '',
    yearJoined: '',
    yearSeparated: '',
    twitterAccountName: '',
    linkedInAccountName: '',
    githubAccountName: '',
    preworkLink: '',
    preworkRepo: '',
  }

  handleSubmit = e => {
    e.preventDefault()
    // set loading state to show in the button

    const validation = this.validator.validate(this.state)
    this.setState({ validation })
    this.setState({ loading: true })
    if(validation.isValid) {
      const gatewayUrl = 'https://5z9d0ddzr4.execute-api.us-east-1.amazonaws.com/prod/apply'
      const options = {
        method: 'POST',
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          city: this.state.city,
          state: this.state.state,
          zipCode: this.state.zipCode,
          country: this.state.country,
          branchOfService: this.state.branchOfService,
          yearJoined: this.state.yearJoined,
          yearSeparated: this.state.yearSeparated,
          twitterAccountName: this.state.twitterAccountName,
          linkedInAccountName: this.state.linkedInAccountName,
          githubAccountName: this.state.githubAccountName,
          preworkLink: this.state.preworkLink,
          preworkRepo: this.state.preworkRepo,
        }),
      }

      fetch(gatewayUrl, options)
        .then(resp => {
          if (resp.ok) {
            const message =
              'Your application has been submitted successfully! ' +
              'We look forward to contacting you soon.'
            const formHeading = 'Thank You'
            window.scrollTo(0, 0)
            this.setState({ message, formSuccess: true, formHeading })
          }
        })
        .catch(() => {
          const formHeading = 'OOPS Some thing went wrong'
          this.setState({ formError: true, formHeading })
        })

      this.setState(this.resetForm)
    }
  }

  render() {
    const { formSuccess, message, formError, loading, formHeading } = this.state

    return (
      <Layout>
        <PageHeader title="apply" />
        <section id="contact" className="pad-regular section bg-default">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <div className="contactus-brief">
                  <h3>{formHeading}</h3>
                  <p className={formSuccess ? 'alert alert-success' : 'section-description'}>
                    {message}
                  </p><br />
                  {formError && (
                    <p className="alert alert-danger fade-in">
                      There was an error trying to submit your application. Please try again.
                    </p>
                  )}
                  {!formSuccess && (
                    <form id="s2do-form" action="#" onSubmit={this.handleSubmit}>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="firstNname" className="dark-text">
                            First Name
                            <sup>*</sup>
                          </label>
                          <input
                            id="firstName"
                            className="form-control input-lg"
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="lastNname" className="dark-text">
                            Last Name
                            <sup>*</sup>
                          </label>
                          <input
                            id="lastName"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="InputEmail" className="dark-text">
                            Email
                            <sup>*</sup>
                          </label>
                          <input
                            id="email"
                            className="form-control input-lg"
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="city" className="dark-text">
                            City<sup>*</sup>
                          </label>
                          <input
                            id="city"
                            className="form-control input-lg"
                            type="text"
                            placeholder="City"
                            name="city"
                            value={this.state.city}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="state" className="dark-text">
                            State<sup>*</sup>
                          </label>
                          <input
                            id="state"
                            className="form-control input-lg"
                            type="text"
                            placeholder="State"
                            name="state"
                            value={this.state.state}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="zipCode" className="dark-text">
                            Zip Code<sup>*</sup>
                          </label>
                          <input
                            id="zipCode"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Zip Code"
                            name="zipCode"
                            value={this.state.zipCode}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="country" className="dark-text">
                            Country<sup>*</sup>
                          </label>
                          <input
                            id="country"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Country"
                            name="country"
                            value={this.state.country}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="branchOfService" className="dark-text">
                            Branch of Service<sup>*</sup>
                          </label>
                          <select
                            id="branchOfService"
                            className="form-control input-lg"
                            placeholder="Branch Of Service"
                            name="branchOfService"
                            onChange={this.handleChange}
                            required>
                            <option value="USA">Army (Active Duty)</option>
                            <option value="USAF">Air Force (Active Duty)</option>
                            <option value="USN">Navy (Active Duty)</option>
                            <option value="USMC">Marine Corps (Active Duty)</option>
                            <option value="USCG">Coast Guard</option>
                            <option value="USAR">Army (Reserves)</option>
                            <option value="USAFR">Air Force (Reserves)</option>
                            <option value="USNR">Navy (Reserves)</option>
                            <option value="USMCR">Marine Corps (Reserves)</option>
                            <option value="USANG">Army (National Guard)</option>
                          </select>
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="yearJoined" className="dark-text">
                            Year Joined<sup>*</sup>
                          </label>
                          <input
                            id="yearJoined"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Year Joined"
                            name="yearJoined"
                            value={this.state.yearJoined}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="yearSeparated" className="dark-text">
                            Year Separated<sup>*</sup>
                          </label>
                          <input
                            id="yearSeparated"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Year Separated"
                            name="yearSeparated"
                            value={this.state.yearSeparated}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="twitterAccountName" className="dark-text">
                            Twitter Account Name<sup>*</sup>
                          </label>
                          <input
                            id="twitterAccountName"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Twitter Account Name"
                            name="twitterAccountName"
                            value={this.state.twitterAccountName}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="linkedinAccountName" className="dark-text">
                            LinkedIn Account Name<sup>*</sup>
                          </label>
                          <input
                            id="linkedinAccountName"
                            className="form-control input-lg"
                            type="text"
                            placeholder="LinkedIn Account Name"
                            name="linkedinAccountName"
                            value={this.state.linkedinAccountName}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="githubAccountName" className="dark-text">
                            Github Account Name<sup>*</sup>
                          </label>
                          <input
                            id="githubAccountName"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Github Account Name"
                            name="githubAccountName"
                            value={this.state.githubAccountName}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="preworkLink" className="dark-text">
                            Prework Link (Your hosted Prework Assignment)<sup>*</sup>
                          </label>
                          <input
                            id="preworkLink"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Prework Link"
                            name="preworkLink"
                            value={this.state.preworkLink}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <label htmlFor="preworkRepo" className="dark-text">
                            Prework Repo (The github repo in which your code resides)<sup>*</sup>
                          </label>
                          <input
                            id="preworkRepo"
                            className="form-control input-lg"
                            type="text"
                            placeholder="Prework Repo"
                            name="preworkRepo"
                            value={this.state.preworkRepo}
                            onChange={this.handleChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="col-md-8">
                        <div className="form-group">
                          <input
                            type="submit"
                            name="submit"
                            value={loading ? 'loading...' : 'submit'}
                            href="#"
                            className="btn btn-charity-default"
                            title=""
                          />
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    )
  }
}
