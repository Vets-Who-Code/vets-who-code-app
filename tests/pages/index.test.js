import React from 'react'
import IndexPage from '../../src/pages/index'
import { render, fireEvent } from '@testing-library/react'

jest.mock('gatsby-plugin-mailchimp', () => email =>
  new Promise(resolve => {
    resolve({
      result: email ? 'success' : 'error',
      msg: email ? 'subscribed successfully' : 'error subscribing',
    })
  })
)

describe('<IndexPage />', () => {
  test('should submit subscription form', () => {
    const { container } = render(<IndexPage />)
    const subscriptionForm = container.querySelector('#s2do-form')
    const submissionInput = container.querySelector('.form-control')

    fireEvent.change(submissionInput, {
      target: { value: 'new-user@mail.com' },
    })

    expect(submissionInput.value).toBe('new-user@mail.com')
    fireEvent.submit(subscriptionForm)
    expect(submissionInput.value).toBe('')
  })

  test('should handle mailchimp errors', () => {
    const { container } = render(<IndexPage />)
    const subscriptionForm = container.querySelector('#s2do-form')
    const submissionInput = container.querySelector('.form-control')
    // const toastMessageContainer = container.querySelector('.Toastify')

    fireEvent.change(submissionInput, {
      target: { value: '' },
    })

    expect(submissionInput.value).toBe('')
    fireEvent.submit(subscriptionForm)
    expect(submissionInput.value).toBe('')
  })

  test('should render correctly', () => {
    const { container } = render(<IndexPage />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
