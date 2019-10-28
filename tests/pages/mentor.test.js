import React from 'react'
import Mentor from '../../src/pages/mentor'
import { render, fireEvent } from '@testing-library/react'

describe('<Mentor />', () => {
  test('should update inputs, submit and clear inputs', async () => {
    const { container } = render(<Mentor />)
    const nameInput = container.querySelector('#name')
    const emailInput = container.querySelector('#email')
    const applyForm = container.querySelector('form')
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
      })
    )
    window.scrollBy = jest.fn()

    fireEvent.change(nameInput, {
      target: {
        value: 'New Mentor',
      },
    })

    fireEvent.change(emailInput, {
      target: {
        value: 'newmentor@mail.com',
      },
    })

    expect(nameInput.value).toBe('New Mentor')
    expect(emailInput.value).toBe('newmentor@mail.com')
    await fireEvent.submit(applyForm)
    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
    expect(window.fetch).toHaveBeenCalled()
    expect(container.querySelector('.alert-success')).toHaveTextContent(
      'Your application has been submitted successfully! We look forward to contacting you soon.'
    )
  })

  test('should handle errors when fetch fails', async () => {
    const { container } = render(<Mentor />)
    const nameInput = container.querySelector('#name')
    const emailInput = container.querySelector('#email')
    const applyForm = container.querySelector('form')
    const fetch = jest.fn().mockImplementation(() => Promise.reject('Failed to fetch'))
    window.fetch = fetch
    fireEvent.change(nameInput, {
      target: {
        value: 'New Mentor',
      },
    })

    fireEvent.change(emailInput, {
      target: {
        value: 'newmentor@mail.com',
      },
    })

    try {
      fireEvent.submit(applyForm)
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
    const { container } = render(<Mentor />)
    expect(container).toMatchSnapshot()
  })
})
