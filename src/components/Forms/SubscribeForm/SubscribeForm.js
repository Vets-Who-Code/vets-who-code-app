import React from 'react'
import PropTypes from 'prop-types'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { useForm } from 'react-hook-form'
import { FormAlert, onSubmitSuccess, onSubmitError } from '../'

function ApplyForm() {
  const subscribeButtonRef = React.useRef()
  const { register, handleSubmit, errors, reset } = useForm()

  const onSubmit = async (formData, e) => {
    e.preventDefault()

    try {
      const gatewayUrl = 'https://5z9d0ddzr4.execute-api.us-east-1.amazonaws.com/prod/subscribe'
      const options = {
        method: 'POST',
        body: JSON.stringify(formData),
      }

      const response = await fetch(gatewayUrl, options)
      const message = 'Thanks for subscribing!'

      if (response.ok) {
        onSubmitSuccess(message)
        reset()
      } else if (!response.ok) {
        onSubmitError('OOPS Something went wrong, please try again later.')
      }
      subscribeButtonRef.current.blur()
    } catch (error) {
      onSubmitError('OOPS Something went wrong, please try again later.')
    }
  }

  return (
    <form id="subscription-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="col-md-9">
          <div className="form-group">
            <input
              className="form-control"
              id="subscriber-email"
              placeholder="Enter your email address"
              name="email"
              ref={register({
                required: true,
                pattern: {
                  value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: 'Please enter a valid email address. Example: jody@example.com',
                },
              })}
            />
            {errors.email && errors.email.type === 'required' && <FormAlert />}
            {errors.email && errors.email.type === 'pattern' && (
              <FormAlert errorMessage={errors.email.message} />
            )}
          </div>
        </div>
        <div className="col-md-3 subscribe-button_box">
          <button
            ref={subscribeButtonRef}
            id="subscribe-button"
            type="submit"
            className="btn btn-subscribe"
          >
            subscribe
          </button>
        </div>
      </div>
    </form>
  )
}

ApplyForm.propTypes = {
  onSubmitSuccess: PropTypes.func,
  onSubmitError: PropTypes.func,
}

export default ApplyForm
