import React from 'react'
import Apply from '../../src/pages/apply'
import { render, fireEvent } from 'react-testing-library';

describe('<Apply />', () => {
  const { container } = render(<Apply />)

  test('should submit form and clear fields', () => {
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
    expect(container.firstChild).toMatchSnapshot()
  })
})
