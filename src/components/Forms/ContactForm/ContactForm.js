import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { FormAlert, onSubmitSuccess, onSubmitError } from '../'

const normalizePhone = (value, previousValue) => {
  if (!value) return value

  const onlyNums = value.replace(/[^\d]/g, '') // only allows 0-9

  if (!previousValue || value.length > previousValue.length) {
    if (onlyNums.length === 3) return `${onlyNums}`
    if (onlyNums.length === 6) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}-`

    if (onlyNums.length <= 3) return onlyNums
    if (onlyNums.length <= 6) return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`

    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`
  }
}

function ContactForm() {
  const [loading, setLoading] = useState(false)
  const [phone, setPhone] = useState('')
  const { register, handleSubmit, errors, reset } = useForm()

  const onSubmit = async (formData, e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const gatewayUrl = 'http://localhost:3000/contact' //'https://5z9d0ddzr4.execute-api.us-east-1.amazonaws.com/prod/contact'
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
      console.log(error)
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
            placeholder="1234567890"
            ref={register({
              required: true,
              pattern: {
                // value: /\((\d{3})\)\s(\d{3})-(\d{4})/g,
                value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                // ^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$
                // (?:\d{1}\s)?\(?(\d{3})\)?-?\s?(\d{3})-?\s?(\d{4})
                message: 'Please input a valid phone number XXXXXXXXXX',
              },
            })}
            onChange={event => {
              const { value } = event.target
              // console.log(setValue('phone', normalizePhone(value)))
              if (value) {
                setPhone(prevPhoneNumber => normalizePhone(value, prevPhoneNumber))
              }

              // console.log(phone)
              // if (value) event.target.value = normalizePhone(value, phone)
            }}
            value={phone}
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
