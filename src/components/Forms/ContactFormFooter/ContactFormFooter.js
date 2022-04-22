import { useState } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { FormAlert, onSubmitSuccess, onSubmitError } from '../'

function ContactFormFooter() {
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
        reset()
      }
    } catch (error) {
      onSubmitError('OOPS! Something went wrong, please try again later.' + error)
      setLoading(false)
    }
  }

  return (
    <form id="s2do-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-12">
        <div className="form-group">
          <label htmlFor="InputEmail" className="light-text">
            Email
            <sup>*</sup>
          </label>
          <input
            type="email"
            className="form-control"
            name="email"
            id="InputEmail"
            placeholder="jodi@example.com"
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
      <div className="col-sm-12">
        <div className="form-group">
          <label htmlFor="message" className="light-text">
            Message
            <sup>*</sup>
          </label>
          <textarea
            id="message"
            className="form-control"
            rows="3"
            name="message"
            placeholder="Message.."
            ref={register({ required: true })}
          />
          {errors.message && errors.message.type === 'required' && <FormAlert />}
        </div>
        <input
          id="cfsubmit"
          type="submit"
          name="submit"
          value={loading ? 'loading...' : 'Send'}
          href="#"
          className="btn btn-charity-default"
          title=""
        />
      </div>
    </form>
  )
}

ContactFormFooter.propTypes = {
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
}

export default ContactFormFooter
