import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { FormAlert, onSubmitSuccess, onSubmitError } from '../'

function MentorForm() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors, reset } = useForm()

  const onSubmit = async (formData, e) => {
    e.preventDefault()
    try {
      const gatewayUrl = 'https://5z9d0ddzr4.execute-api.us-east-1.amazonaws.com/prod/mentor'
      const options = {
        method: 'POST',
        body: JSON.stringify(formData),
      }
      const response = await fetch(gatewayUrl, options)

      if (response.ok) {
        onSubmitSuccess('Your form was successfully submitted.')
        setLoading(false)
        reset()
      }
    } catch (error) {
      onSubmitError('OOPS Something went wrong, please try again later.')
      setLoading(false)
    }
  }

  return (
    <form id="s2do-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="InputName" className="dark-text">
            Name
            <sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            ref={register({ required: true })}
          />
        </div>
        {errors.name && errors.name.type === 'required' && <FormAlert />}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="InputEmail" className="dark-text">
            Email
            <sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            ref={register({
              required: true,
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email address jody@example.com',
              },
            })}
          />
        </div>
        {errors.email && errors.email.type === 'required' && <FormAlert />}
        {errors.email && errors.email.type === 'pattern' && (
          <FormAlert errorMessage={errors.email.message} />
        )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="InputService" className="dark-text">
            Military Branch Of Service
            <sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            type="text"
            id="branch-of-service"
            placeholder="Thank you for your service"
            name="branch-of-service"
            ref={register({ required: true })}
          />
        </div>
        {errors['branch-of-service'] && errors['branch-of-service'].type === 'required' && (
          <FormAlert />
        )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="InputTechnicalExpertise" className="dark-text">
            Area Of Technical Expertise ( Javascript, Ruby, etc)
            <sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            type="text"
            id="technical-expertise"
            placeholder="What languages you write in?"
            name="technical-expertise"
            ref={register({ required: true })}
          />
        </div>
        {errors['technical-expertise'] && errors['technical-expertise'].type === 'required' && (
          <FormAlert />
        )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="InputPortfolio" className="dark-text">
            Github, Portfolio or Linkedin
            <sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            type="text"
            id="github-portfolio-or-linkedin"
            placeholder="Share your work"
            name="github-portfolio-or-linkedin"
            ref={register({
              required: true,
              pattern: {
                value: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                message: 'Please enter a valid url',
              },
            })}
          />
        </div>
        {errors['github-portfolio-or-linkedin'] &&
          errors['github-portfolio-or-linkedin'].type === 'required' && <FormAlert />}
        {errors['github-portfolio-or-linkedin'] &&
          errors['github-portfolio-or-linkedin'].type === 'pattern' && (
            <FormAlert errorMessage={errors['github-portfolio-or-linkedin'].message} />
          )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="InputLocation" className="dark-text">
            Location ( City and State )<sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            type="text"
            id="location"
            placeholder="Location"
            name="location"
            ref={register({ required: true })}
          />
        </div>
        {errors.location && errors.location.type === 'required' && <FormAlert />}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="InputEmployerImplementedRestricted" className="dark-text">
            Employer Implemented Restrictions, If Any.
          </label>
          <textarea
            className="form-control"
            rows="7"
            placeholder="Please put here any employer restrictions about writing and reading code?"
            id="employer-restrictions"
            name="employer-restrictions"
            ref={register({ required: true })}
          />
        </div>
        {errors['employer-restrictions'] && errors['employer-restrictions'].type === 'required' && (
          <FormAlert />
        )}
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
  )
}

MentorForm.propTypes = {
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
}

export default MentorForm
