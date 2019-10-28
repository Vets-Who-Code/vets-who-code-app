import React from 'react'
import Contact from '../../src/pages/contact'
import { render, fireEvent } from '@testing-library/react'

describe('<Contact />', () => {
  test('should submit subscription form', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    )
    window.scrollTo = jest.fn()
    const { container } = render(<Contact />)
    const applicationForm = container.querySelector('#s2do-form')
    const nameInput = container.querySelector('#InputName')
    const emailInput = container.querySelector('#InputEmail')
    const phoneInput = container.querySelector('#InputPhoneNumber')
    const messageTextArea = container.querySelector('#message')

    fireEvent.change(nameInput, {
      target: { value: 'Jodi' },
    })

    fireEvent.change(emailInput, {
      target: { value: 'jodi@mail.com' },
    })

    fireEvent.change(phoneInput, {
      target: { value: 5555555555 },
    })

    fireEvent.change(messageTextArea, {
      target: { value: 'Please Let me Join, I want to be a dev!!!' },
    })

    expect(nameInput.value).toBe('Jodi')
    expect(emailInput.value).toBe('jodi@mail.com')
    expect(phoneInput.value).toBe('5555555555')
    expect(messageTextArea.value).toBe('Please Let me Join, I want to be a dev!!!')
    fireEvent.submit(applicationForm)
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
    const { container } = render(<Contact />)
    const applicationForm = container.querySelector('#s2do-form')
    const nameInput = container.querySelector('#InputName')
    const emailInput = container.querySelector('#InputEmail')
    const phoneInput = container.querySelector('#InputPhoneNumber')
    const messageTextArea = container.querySelector('#message')

    fireEvent.change(nameInput, {
      target: { value: 'Jodi' },
    })

    fireEvent.change(emailInput, {
      target: { value: 'jodi@mail.com' },
    })

    fireEvent.change(phoneInput, {
      target: { value: 5555555555 },
    })

    fireEvent.change(messageTextArea, {
      target: { value: 'Please Let me Join, I want to be a dev!!!' },
    })

    try {
      fireEvent.submit(applicationForm)
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

  test('should render correctly', () => {
    const { container } = render(<Contact />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
