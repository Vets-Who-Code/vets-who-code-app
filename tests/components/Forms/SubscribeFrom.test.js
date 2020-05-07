import React from 'react'
import { SubscribeForm } from '../../../src/components/Forms'
import { render, fireEvent, waitFor } from '@testing-library/react'

describe('<SubscribeForm />', () => {
  test('should submit subscription form', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    )
    const { container } = render(<SubscribeForm />)
    const subscriptionForm = container.querySelector('#subscription-form')
    const emailInput = container.querySelector('#subscriber-email')

    fireEvent.input(emailInput, {
      target: { value: 'jodi@mail.com' },
    })

    expect(emailInput.value).toBe('jodi@mail.com')

    await waitFor(() => fireEvent.submit(subscriptionForm))

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(emailInput.value).toBe('')
  })

  test('should handle errors when submission fails', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        status: 200,
      })
    )
    const { container } = render(<SubscribeForm />)
    const subscriptionForm = container.querySelector('#subscription-form')
    const emailInput = container.querySelector('#subscriber-email')

    fireEvent.input(emailInput, {
      target: { value: 'jodi@mail.com' },
    })

    expect(emailInput.value).toBe('jodi@mail.com')

    fireEvent.input(emailInput, {
      target: { value: 'jodi@mail.com' },
    })

    try {
      await waitFor(() => fireEvent.submit(subscriptionForm))
    } catch (e) {
      const errorMessage = container.querySelector('.alert-danger')
      expect(e).toMatch('Failed to fetch')
      expect(errorMessage).toBeTruthy()
      expect(errorMessage).toHaveTextContent(
        'There was an error trying to submit your application. Please try again.'
      )
    }
    expect(window.fetch).toHaveBeenCalledTimes(1)
  })

  test('should render error message when inputs submitted empty', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        status: 200,
      })
    )

    const { container } = render(<SubscribeForm />)
    const subscriptionForm = container.querySelector('#subscription-form')
    const emailInput = container.querySelector('#subscriber-email')

    fireEvent.input(emailInput, {
      target: { value: '' },
    })

    expect(emailInput.value).toBe('')

    try {
      await waitFor(() => fireEvent.submit(subscriptionForm))
    } catch (e) {
      const errorMessage = container.querySelector('.alert-danger')
      expect(e).toMatch('Failed to fetch')
      expect(errorMessage).toBeTruthy()
      expect(errorMessage).toHaveTextContent(
        'There was an error trying to submit your application. Please try again.'
      )
    }

    const errorMessages = container.querySelectorAll('.alert-danger')
    expect(errorMessages.length).toBe(1)

    await waitFor(() => {
      fireEvent.input(emailInput, {
        target: { value: 'jodi@mail.com' },
      })
    })

    const errorMessageAfterEdit = container.querySelectorAll('.alert-danger')
    expect(errorMessageAfterEdit.length).toBe(0)
  })

  test('should render custom error message when inputs submitted with incorrect values', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        status: 200,
      })
    )

    const { container } = render(<SubscribeForm />)
    const subscriptionForm = container.querySelector('#subscription-form')
    const emailInput = container.querySelector('#subscriber-email')

    fireEvent.input(emailInput, {
      target: { value: 'mail@' },
    })

    try {
      await waitFor(() => fireEvent.submit(subscriptionForm))
    } catch (e) {
      const errorMessage = container.querySelector('.alert-danger')
      expect(e).toMatch('Failed to fetch')
      expect(errorMessage).toBeTruthy()
      expect(errorMessage).toHaveTextContent(
        'There was an error trying to submit your application. Please try again.'
      )
    }

    const errorMessages = container.querySelectorAll('.alert-danger')
    expect(errorMessages.length).toBe(1)
    expect(errorMessages[0].textContent).toContain(
      'Please enter a valid email address. Example: jody@example.com'
    )

    await waitFor(() => {
      fireEvent.input(emailInput, {
        target: { value: 'jodi@mail.com' },
      })
    })

    const errorMessageAfterEdit = container.querySelectorAll('.alert-danger')
    expect(errorMessageAfterEdit.length).toBe(0)
  })
})
