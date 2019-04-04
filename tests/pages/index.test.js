import React from 'react'
import IndexPage from '../../src/pages/index'
import { render, fireEvent } from 'react-testing-library'

describe('<IndexPage />', () => {
  test.skip('should submit subscription form', async () => {
    const { container } = render(<IndexPage />)
    const subscriptionForm = container.querySelector('#s2do-form');
    const submissionInput = container.querySelector('.form-control')

    fireEvent.change(submissionInput, {
      target: { value: 'new-user@mail.com'},
    })

    expect(submissionInput.value).toBe('new-user@mail.com')
    fireEvent.submit(subscriptionForm)
    expect(submissionInput.value).toBe('')
  })

  test('should render correctly', () => {
    const { container } = render(<IndexPage />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
