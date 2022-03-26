import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { FormAlert, onSubmitError, onSubmitSuccess } from '../'

function ApplyForm() {
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors, reset } = useForm()

  const initialCityState = { city: '', state: '' }
  const [zipError, setZipError] = useState('')
  const [cityState, setCityState] = useState(initialCityState)
  const [zipcode, setZipcode] = useState('')
  const isZipValid = zipcode.length === 5

  useEffect(() => {
    const fetchCityState = async () => {
      const zipcodeApiEndpoint = `/api/zipcode?zipcode=${zipcode}`
      const options = {
        headers: { accept: 'application/json' },
      }

      try {
        if (isZipValid) {
          const response = await fetch(zipcodeApiEndpoint, options)
          const data = await response.json()

          if (data?.city && data?.state) {
            setLoading(false)
            setZipError('')
            setCityState({
              ...cityState,
              city: data.city,
              state: data.state,
            })
          } else if (data?.zipcodeLookupError) {
            setLoading(false)
            setZipError(data.zipcodeLookupError)
          }
        }
      } catch (error) {
        setLoading(false)
        onSubmitError('OOPS! Something went wrong. Please try again later.')
      }
    }
    fetchCityState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zipcode])

  const onSubmit = async (formData, e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const applyApiEndpoint = '/api/apply'
      const options = {
        method: 'POST',
        body: JSON.stringify(formData),
      }

      const response = await fetch(applyApiEndpoint, options)
      const message = 'Your application has been submitted successfully!'

      if (response.ok) {
        onSubmitSuccess(message)
        setLoading(false)
        reset()
        setCityState(initialCityState)
        setZipcode('')
      }
    } catch (error) {
      onSubmitError('OOPS! Something went wrong, please try again later.')
      setLoading(false)
    }
  }

  return (
    <form id="s2do-form" action="#" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="firstName" className="dark-text">
            First Name
            <sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            id="firstName"
            name="firstName"
            placeholder="First Name"
            type="text"
            ref={register({ required: true })}
          />
        </div>
        {errors.firstName && <FormAlert />}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="lastName" className="dark-text">
            Last Name
            <sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            id="lastName"
            name="lastName"
            placeholder="Last Name"
            type="text"
            ref={register({ required: true })}
          />
        </div>
        {errors.lastName && <FormAlert />}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="email" className="dark-text">
            Email
            <sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            id="email"
            name="email"
            placeholder="Email"
            ref={register({
              required: true,
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please enter a valid email address',
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
          <label htmlFor="zipCode" className="dark-text">
            Zip Code<sup>*</sup>
          </label>
          <input
            maxLength="5"
            className="form-control input-lg"
            id="zipCode"
            name="zipCode"
            placeholder="Zip Code"
            type="text"
            ref={register({
              required: true,
              pattern: {
                value: /^\d{5}(?:[-\s]\d{4})?$/,
                message: 'Please enter a valid zip code XXXXX or XXXXX-XXXX',
              },
            })}
            value={zipcode || ''}
            onChange={event => {
              const { value } = event.target
              setLoading(true)
              setCityState(initialCityState)
              setZipcode(value.replace(/[^\d{5}]$/, '').substr(0, 5))
            }}
          />
        </div>
        {errors.zipCode && errors.zipCode.type === 'required' && <FormAlert />}
        {errors.zipCode && errors.zipCode.type === 'pattern' && (
          <FormAlert errorMessage={errors.zipCode.message} />
        )}
        {zipError && <FormAlert errorMessage={zipError} />}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="city" className="dark-text">
            City<sup>*</sup>
          </label>
          <div className="input-container">
            <input
              className="form-control input-lg"
              id="city"
              name="city"
              placeholder="City"
              type="text"
              ref={register({ required: true })}
              value={cityState.city}
              readOnly
            />{' '}
            <div className="icon-container">
              <i className={`${loading && isZipValid ? 'loader' : ''}`}></i>
            </div>
          </div>
        </div>
        {errors.city && <FormAlert />}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="state" className="dark-text">
            State<sup>*</sup>
          </label>
          <div className="input-container">
            <input
              className="form-control input-lg"
              id="state"
              name="state"
              placeholder="State"
              type="text"
              ref={register({ required: true })}
              value={cityState.state}
              readOnly
            />{' '}
            <div className="icon-container">
              <i className={`${loading && isZipValid ? 'loader' : ''}`}></i>
            </div>
          </div>
        </div>
        {errors.state && <FormAlert />}
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
            ref={register({ required: true, pattern: /[A-Za-z]/ })}
          />
        </div>
        {errors.country && <FormAlert />}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="branchOfService" className="dark-text">
            Branch of Service<sup>*</sup>
          </label>
          <div className="select-arrow">
            <select
              id="branchOfService"
              className="form-control input-lg standard-select"
              placeholder="Branch Of Service"
              name="branchOfService"
              ref={register({ required: true, validate: value => value !== 'DEFAULT' })}
              defaultValue="DEFAULT"
            >
              <option value="DEFAULT" disabled>
                Select your branch
              </option>
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
        {errors.branchOfService && <FormAlert errorMessage="Please select a branch" />}
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
            ref={register({
              required: true,
              pattern: {
                value: /[\d]{4}/,
                message: 'Please enter year in YYYY format',
              },
            })}
          />
        </div>
        {errors.yearJoined && errors.yearJoined.type === 'required' && <FormAlert />}
        {errors.yearJoined && errors.yearJoined.type === 'pattern' && (
          <FormAlert errorMessage={errors.yearJoined.message} />
        )}
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
            ref={register({
              required: true,
              pattern: {
                value: /[\d]{4}/,
                message: 'Please enter year in YYYY format',
              },
            })}
          />
        </div>
        {errors.yearSeparated && errors.yearSeparated.type === 'required' && <FormAlert />}
        {errors.yearSeparated && errors.yearSeparated.type === 'pattern' && (
          <FormAlert errorMessage={errors.yearSeparated.message} />
        )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="twitterAccountName" className="dark-text">
            Twitter Profile URL<sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            id="twitterAccountName"
            name="twitterAccountName"
            placeholder="Twitter Profile URL"
            type="text"
            ref={register({
              required: true,
              pattern: {
                value: /http(s)?:\/\/(.*\.)?twitter\.com\/[A-z0-9_]+\/?/,
                message: 'Please enter a valid twitter account url',
              },
            })}
          />
        </div>
        {errors.twitterAccountName && errors.twitterAccountName.type === 'required' && (
          <FormAlert />
        )}
        {errors.twitterAccountName && errors.twitterAccountName.type === 'pattern' && (
          <FormAlert errorMessage={errors.twitterAccountName.message} />
        )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="linkedInAccountName" className="dark-text">
            LinkedIn Profile URL<sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            id="linkedInAccountName"
            name="linkedInAccountName"
            placeholder="LinkedIn Profile URL"
            type="text"
            ref={register({
              required: true,
              pattern: {
                value: /http(s)?:\/\/([\w]+\.)?linkedin\.com\/in\/[A-z0-9_-]+\/?/,
                message: 'Please enter a valid LinkedIn url https://linkedin.com/in/user-name',
              },
            })}
          />
        </div>
        {errors.linkedInAccountName && errors.linkedInAccountName.type === 'required' && (
          <FormAlert />
        )}
        {errors.linkedInAccountName && errors.linkedInAccountName.type === 'pattern' && (
          <FormAlert errorMessage={errors.linkedInAccountName.message} />
        )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="githubAccountName" className="dark-text">
            Github User Name<sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            id="githubAccountName"
            name="githubAccountName"
            placeholder="Github User Name"
            type="text"
            ref={register({
              required: true,
              pattern: {
                value: /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/,
                message: 'Please enter your github username',
              },
            })}
          />
        </div>
        {errors.githubAccountName && errors.githubAccountName.type === 'required' && <FormAlert />}
        {errors.githubAccountName && errors.githubAccountName.type === 'pattern' && (
          <FormAlert errorMessage={errors.githubAccountName.message} />
        )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="preworkLink" className="dark-text">
            Prework Link (Your Hosted Prework Assignment)<sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            id="preworkLink"
            name="preworkLink"
            placeholder="Prework Link"
            type="text"
            ref={register({
              required: true,
              pattern: {
                value:
                  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
                message: 'Please enter a valid url',
              },
            })}
          />
        </div>
        {errors.preworkLink && errors.preworkLink.type === 'required' && <FormAlert />}
        {errors.preworkLink && errors.preworkLink.type === 'pattern' && (
          <FormAlert errorMessage={errors.preworkLink.message} />
        )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <label htmlFor="preworkRepo" className="dark-text">
            Prework Repo (The github repo in which your code resides)<sup>*</sup>
          </label>
          <input
            className="form-control input-lg"
            id="preworkRepo"
            name="preworkRepo"
            placeholder="Prework Repo"
            type="text"
            ref={register({
              required: true,
              pattern: {
                value: /http(s)?:\/\/(www\.)?github.com\/[^/]+\/[^/]+/,
                message:
                  'Please enter a GitHub repository url https://github.com/user-name/repo-name',
              },
            })}
          />
        </div>
        {errors.preworkRepo && errors.preworkRepo.type === 'required' && <FormAlert />}
        {errors.preworkRepo && errors.preworkRepo.type === 'pattern' && (
          <FormAlert errorMessage={errors.preworkRepo.message} />
        )}
      </div>
      <div className="col-md-8">
        <div className="form-group">
          <input
            className="btn btn-charity-default"
            href="#"
            name="submit"
            title=""
            type="submit"
            value={loading ? 'loading...' : 'submit'}
          />
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
