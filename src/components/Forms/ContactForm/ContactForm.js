import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { FormAlert, onSubmitSuccess, onSubmitError } from '../'

function ContactForm() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors, reset } = useForm()

  const onSubmit = async (formData, e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const gatewayUrl = 'https://5z9d0ddzr4.execute-api.us-east-1.amazonaws.com/prod/contact'
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
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="InputName" className="dark-text">
            Your Display Name
            <sup>*</sup>
          </label>
          <input
            type="text"
            className="form-control form-control-dark"
            name="name"
            id="InputName"
            placeholder="Jody"
            ref={register({ required: true })}
          />
        </div>
        {errors.name && errors.name.type === 'required' && <FormAlert />}
      </div>
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="InputEmail" className="dark-text">
            Your Email Address
            <sup>*</sup>
          </label>
          <input
            type="email"
            className="form-control form-control-dark"
            name="email"
            id="InputEmail"
            placeholder="jody@example.com"
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
      <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="InputPhoneNumber" className="dark-text">
            Your Phone Number
          </label>
          <input
            // type="number"
            className="form-control form-control-dark"
            name="phone"
            id="InputPhoneNumber"
            placeholder="123-456-789"
            ref={register({
              required: true,
              pattern: {
                value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                message: 'Please input a valid phone number XXX-XXX-XXXX',
              },
            })}
          />
        </div>
        {errors.phone && errors.phone.type === 'required' && <FormAlert />}
        {errors.phone && errors.phone.type === 'pattern' && (
          <FormAlert errorMessage={errors.phone.message} />
        )}
      </div>
      <div className="col-sm-12">
        <div className="form-group">
          <label htmlFor="message" className="dark-text">
            Your Message
            <sup>*</sup>
          </label>
          <textarea
            id="message"
            className="form-control form-control-dark"
            rows="3"
            name="message"
            placeholder="Your Message Here.."
            ref={register({ required: true })}
          />
          {errors.message && errors.message.type === 'required' && <FormAlert />}
        </div>
        <input
          id="cfsubmit"
          type="submit"
          name="submit"
          value={loading ? 'loading...' : 'Submit Message'}
          href="#"
          className="btn btn-charity-default"
          title=""
        />
      </div>
    </form>
  )
}

ContactForm.propTypes = {
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
}

export default ContactForm
