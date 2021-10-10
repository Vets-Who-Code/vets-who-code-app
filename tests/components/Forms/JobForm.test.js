import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import JobForm from '../../../src/components/Forms/JobForm'

describe('Job Search Form', () => {
  const jobForm = jest.fn().mockImplementation((submit, page) => {
    return Promise.resolve({ submit, page })
  })

  test('should set fields and submit form', async () => {
    const { container } = render(<JobForm formData={jobForm} apiError={false} />)
    const form = container.querySelector('form')
    const zipCodeInput = container.querySelector('#zipCode')
    const remoteCheckbox = container.querySelector('#inlineFormCheck')
    const distanceSelect = container.querySelector('#distanceSelect')

    fireEvent.input(zipCodeInput, { target: { value: '02901' } })
    fireEvent.input(remoteCheckbox, { target: { value: 'false' } })
    fireEvent.input(distanceSelect, { target: { value: '40' } })

    expect(zipCodeInput.value).toBe('02901')
    expect(remoteCheckbox.value).toBe('false')
    expect(distanceSelect.value).toBe('40')

    await waitFor(() => fireEvent.submit(form))
    expect(jobForm).toHaveBeenCalled()
  })

  test('Test invalid zipCode with letters', async () => {
    const { container } = render(<JobForm formData={jobForm} apiError={false} />)
    const zipCodeInput = container.querySelector('#zipCode')
    fireEvent.input(zipCodeInput, { target: { value: 'A111AA' } })
    expect(zipCodeInput.value).toBe('')
  })

  test('Test for async failures', async () => {
    const jobForm = jest.fn().mockImplementation(() => {
      return Promise.reject({ message: 'failed' })
    })
    const { container } = render(<JobForm formData={jobForm} apiError={false} />)
    const zipCodeInput = container.querySelector('#zipCode')
    fireEvent.input(zipCodeInput, { target: { value: 'A111AA' } })
    expect(zipCodeInput.value).toBe('')
  })

  test('Test for Adzuna API async failures', async () => {
    render(<JobForm formData={jobForm} apiError={true} />)
    expect(await screen.findByText('API Error')).toBeInTheDocument()
  })
})
