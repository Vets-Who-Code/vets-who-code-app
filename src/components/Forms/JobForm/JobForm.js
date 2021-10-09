import { onSubmitError } from '../'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import './Jobform.css'

function JobForm({ formData, apiError }) {
  const { register, handleSubmit } = useForm()
  const [zipRequired, setZipRequired] = useState(true)
  const isConus = event => {
    if (event.target.value === '5000') {
      setZipRequired(false)
    } else {
      setZipRequired(true)
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(submit => formData(submit, 1))}
        className="form-inline text-center job-form"
        id="jobForm"
        data-testid="form"
      >
        <div className="zipcode-container">
          <label className="sr-only job-label" htmlFor="zipCode">
            Zip Code
          </label>
          <input
            type="number"
            pattern="[0-9]{5}"
            className="form-control input-md"
            id="zipCode"
            placeholder="Zip Code"
            required={zipRequired}
            name="zipCode"
            ref={register}
          />
        </div>
        <div className="remote-container">
          <input
            className="form-check-input"
            type="checkbox"
            id="inlineFormCheck"
            name="remote"
            ref={register}
          />
          <label
            className="form-check-label job-label"
            htmlFor="inlineFormCheck"
            style={{ marginLeft: 5 }}
          >
            Remote Only
          </label>
        </div>

        <div className="form-group distance-container">
          <label htmlFor="distanceSelect job-label"></label>
          <select
            className="form-control input-md"
            id="distanceSelect"
            defaultValue="40"
            name="distance"
            onChange={isConus}
            ref={register}
          >
            {/* <!-- value is set in km --> */}
            <option value="1">Only in</option>
            <option value="8">5 mi.</option>
            <option value="16">10 mi.</option>
            <option value="24">15 mi.</option>
            <option value="40">25 mi.</option>
            <option value="80">50 mi.</option>
            <option value="161">100 mi.</option>
            <option value="322">200 mi.</option>
            <option value="5000">CONUS</option>
          </select>
        </div>

        <div className="search-button">
          <button type="submit" className="btn btn-charity-default">
            <i className="glyphicon glyphicon-search">&nbsp;Search</i>
          </button>
        </div>
      </form>
      {apiError ? onSubmitError('OOPS Something went wrong, please try again later.') : ''}
      {apiError ? <div className="hide">API Error</div> : ''}
    </>
  )
}

JobForm.propTypes = {
  formData: PropTypes.func,
  apiError: PropTypes.bool,
}

export default JobForm
