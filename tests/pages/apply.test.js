import React from 'react'
import Apply from '../../src/pages/apply'
import { render, fireEvent } from 'react-testing-library';

describe('<Apply />', () => {
  test('should submit form and clear fields', () => {
    const { container } = render(<Apply />)
    const nameInput = container.querySelector('#name')
    const applyForm = container.querySelector('form')
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve())

    fireEvent.change(nameInput, {
      target: {
        value: 'New User'
      }
    })

    expect(nameInput.value).toBe('New User')
    fireEvent.submit(applyForm)
    expect(nameInput.value).toBe('')
  })

  test('should render correctly', () => {
    const { container } = render(<Apply />)
    expect(container).toMatchSnapshot()
  })
})
