import React from 'react'
import Apply from '../../src/pages/apply'
import { render, fireEvent } from '@testing-library/react'

describe('<Apply />', () => {
  test('should submit form and clear fields', () => {
    const { container } = render(<Apply />)
    const nameInput = container.querySelector('#name')
    const applyForm = container.querySelector('form')
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve())

    fireEvent.change(nameInput, {
      target: {
        value: 'New User',
      },
    })

    expect(nameInput.value).toBe('New User')
    try {
      fireEvent.submit(applyForm)
    } catch (error) {
      console.log(error)
    }
    expect(nameInput.value).toBe('')
  })

  test('should handle errors when submission fails', async () => {
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject({
        ok: false,
      })
    )
    const { container } = render(<Apply />)
    const nameInput = container.querySelector('#name')
    const applyForm = container.querySelector('form')

    fireEvent.change(nameInput, {
      target: {
        value: 'New User',
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
    const { container } = render(<Apply />)
    expect(container).toMatchSnapshot()
  })
})
