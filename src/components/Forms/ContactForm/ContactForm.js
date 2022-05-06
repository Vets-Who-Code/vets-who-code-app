import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { FormAlert, onSubmitSuccess, onSubmitError } from '../'

// Function for input mask on phone number field
// Formats XXXXXXXXXX as XXX-XXX-XXXX as you type
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

function ContactForm(props) {
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors, reset } = useForm()

  const onSubmit = async (formData, e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const contactApiEndpoint = '/api/contact'
      const options = {
        method: 'POST',
        body: JSON.stringify(formData),
      }
      const response = await fetch(contactApiEndpoint, options)
      if (response.ok) {
        onSubmitSuccess('Your form was successfully submitted.')
        setLoading(false)
        setPhone('')
        reset()
      }
    } catch (error) {
      onSubmitError('OOPS! Something went wrong, please try again later.')
      setLoading(false)
    }
  }
  if (props.emailMessage) {
    return (
      <form id="s2do-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <div className="form-group">
            <label htmlFor="InputEmail" className="footer-form-label">
              Your Email Address
              <sup>*</sup>
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              id="InputEmail"
              placeholder="jody@example.com"
              ref={register({
                required: true,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
        <div className="">
          <div className="form-group">
            <label htmlFor="message" className="footer-form-label">
              Your Message
              <sup>*</sup>
            </label>
            <textarea
              id="message"
              className="form-control"
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
  } else {
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
              className="form-control"
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
              className="form-control"
              name="email"
              id="InputEmail"
              placeholder="jody@example.com"
              ref={register({
                required: true,
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
              type="tel"
              className="form-control"
              name="phone"
              id="InputPhoneNumber"
              placeholder="1234567890"
              ref={register({
                required: true,
                pattern: {
                  value: /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
                  message: 'Please input a valid phone number XXXXXXXXXX',
                },
              })}
              onChange={event => {
                const { value } = event.target
                setPhone(previousValue => normalizePhone(value, previousValue))
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
              className="form-control"
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
}

ContactForm.propTypes = {
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
}

export default ContactForm
