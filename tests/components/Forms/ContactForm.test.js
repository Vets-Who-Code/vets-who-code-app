import React from 'react'
import { ContactForm } from '../../../src/components/Forms'
import { render, fireEvent, waitFor } from '@testing-library/react'

describe('<ContactFrom />', () => {
  test('should submit subscription form', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    )
    const { container } = render(<ContactForm />)
    const applicationForm = container.querySelector('#s2do-form')
    const nameInput = container.querySelector('#InputName')
    const emailInput = container.querySelector('#InputEmail')
    const phoneInput = container.querySelector('#InputPhoneNumber')
    const messageTextArea = container.querySelector('#message')

    fireEvent.input(nameInput, {
      target: { value: 'Jodi' },
    })

    fireEvent.input(emailInput, {
      target: { value: 'jodi@mail.com' },
    })

    fireEvent.input(phoneInput, {
      target: { value: '555-555-5555' },
    })

    fireEvent.input(messageTextArea, {
      target: { value: 'Please Let me Join, I want to be a dev!!!' },
    })

    expect(nameInput.value).toBe('Jodi')
    expect(emailInput.value).toBe('jodi@mail.com')
    expect(phoneInput.value).toBe('555-555-5555')
    expect(messageTextArea.value).toBe('Please Let me Join, I want to be a dev!!!')

    await waitFor(() => fireEvent.submit(applicationForm))

    expect(window.fetch).toHaveBeenCalledTimes(1)
    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(phoneInput.value).toBe('')
    expect(messageTextArea.value).toBe('')
  })

  test('should handle errors when submission fails', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        status: 200,
      })
    )
    const { container } = render(<ContactForm />)
    const applicationForm = container.querySelector('#s2do-form')
    const nameInput = container.querySelector('#InputName')
    const emailInput = container.querySelector('#InputEmail')
    const phoneInput = container.querySelector('#InputPhoneNumber')
    const messageTextArea = container.querySelector('#message')

    fireEvent.input(nameInput, {
      target: { value: 'Jodi' },
    })

    fireEvent.input(emailInput, {
      target: { value: 'jodi@mail.com' },
    })

    fireEvent.input(phoneInput, {
      target: { value: '555-555-5555' },
    })

    fireEvent.input(messageTextArea, {
      target: { value: 'Please Let me Join, I want to be a dev!!!' },
    })

    try {
      await waitFor(() => fireEvent.submit(applicationForm))
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

    const { container } = render(<ContactForm />)
    const applicationForm = container.querySelector('#s2do-form')
    const nameInput = container.querySelector('#InputName')
    const emailInput = container.querySelector('#InputEmail')
    const phoneInput = container.querySelector('#InputPhoneNumber')
    const messageTextArea = container.querySelector('#message')

    fireEvent.input(nameInput, {
      target: { value: '' },
    })

    fireEvent.input(emailInput, {
      target: { value: '' },
    })

    fireEvent.input(phoneInput, {
      target: { value: '' },
    })

    fireEvent.input(messageTextArea, {
      target: { value: '' },
    })

    try {
      await waitFor(() => fireEvent.submit(applicationForm))
    } catch (e) {
      const errorMessage = container.querySelector('.alert-danger')
      expect(e).toMatch('Failed to fetch')
      expect(errorMessage).toBeTruthy()
      expect(errorMessage).toHaveTextContent(
        'There was an error trying to submit your application. Please try again.'
      )
    }

    const errorMessages = container.querySelectorAll('.alert-danger')
    expect(errorMessages.length).toBe(4)

    await waitFor(() => {
      fireEvent.input(nameInput, {
        target: { value: 'Jodi' },
      })

      fireEvent.input(emailInput, {
        target: { value: 'jodi@mail.com' },
      })

      fireEvent.input(phoneInput, {
        target: { value: '555-555-5555' },
      })

      fireEvent.input(messageTextArea, {
        target: { value: 'Please Let me Join, I want to be a dev!!!' },
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

    const { container } = render(<ContactForm />)
    const applicationForm = container.querySelector('#s2do-form')
    const nameInput = container.querySelector('#InputName')
    const emailInput = container.querySelector('#InputEmail')
    const phoneInput = container.querySelector('#InputPhoneNumber')
    const messageTextArea = container.querySelector('#message')

    fireEvent.input(nameInput, {
      target: { value: 'Jody' },
    })

    fireEvent.input(emailInput, {
      target: { value: 'mail@' },
    })

    fireEvent.input(phoneInput, {
      target: { value: '5555555555' },
    })

    fireEvent.input(messageTextArea, {
      target: { value: 'hello' },
    })

    try {
      await waitFor(() => fireEvent.submit(applicationForm))
    } catch (e) {
      const errorMessage = container.querySelector('.alert-danger')
      expect(e).toMatch('Failed to fetch')
      expect(errorMessage).toBeTruthy()
      expect(errorMessage).toHaveTextContent(
        'There was an error trying to submit your application. Please try again.'
      )
    }

    const errorMessages = container.querySelectorAll('.alert-danger')
    expect(errorMessages.length).toBe(2)
    expect(errorMessages[0].textContent).toContain(
      'Please enter a valid email address jody@example.com'
    )
    expect(errorMessages[1].textContent).toContain('Please input a valid phone number XXX-XXX-XXXX')

    await waitFor(() => {
      fireEvent.input(nameInput, {
        target: { value: 'Jodi' },
      })

      fireEvent.input(emailInput, {
        target: { value: 'jodi@mail.com' },
      })

      fireEvent.input(phoneInput, {
        target: { value: '555-555-5555' },
      })

      fireEvent.input(messageTextArea, {
        target: { value: 'Please Let me Join, I want to be a dev!!!' },
      })
    })

    const errorMessageAfterEdit = container.querySelectorAll('.alert-danger')
    expect(errorMessageAfterEdit.length).toBe(0)
  })
})
