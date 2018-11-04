import React from 'react'
import Contact from '../../src/pages/contact'
import { render, fireEvent } from 'react-testing-library'

describe('<Contact />', () => {
  test('should submit subscription form', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
    }))
    const { container } = render(<Contact />)
    const applicationForm = container.querySelector('#s2do-form')
    const nameInput = container.querySelector('#InputName')
    const emailInput = container.querySelector('#InputEmail')
    const phoneInput = container.querySelector('#InputPhoneNumber')
    const messageTextArea = container.querySelector('#message')

    fireEvent.change(nameInput, {
      target: { value: 'Jodi'},
    })

    fireEvent.change(emailInput, {
      target: { value: 'jodi@mail.com'},
    })

    fireEvent.change(phoneInput, {
      target: { value: 5555555555},
    })

    fireEvent.change(messageTextArea, {
      target: { value: 'Please Let me Join, I want to be a dev!!!'},
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

  test('should render correctly', () => {
    const { container } = render(<Contact />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
