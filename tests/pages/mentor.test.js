import React from 'react'
import Mentor from '../../src/pages/mentor'
import { render, fireEvent } from '@testing-library/react'


describe('<Mentor />', () => {
  test('should update inputs, submit and clear inputs', () => {
    const { container } = render(<Mentor />)
    const nameInput = container.querySelector('#name')
    const emailInput = container.querySelector('#email')
    const applyForm = container.querySelector('form')
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve())

    fireEvent.change(nameInput, {
      target: {
        value: 'New Mentor'
      }
    })

    fireEvent.change(emailInput, {
      target: {
        value: 'newmentor@mail.com'
      }
    })

    expect(nameInput.value).toBe('New Mentor')
    expect(emailInput.value).toBe('newmentor@mail.com')
    fireEvent.submit(applyForm)
    expect(nameInput.value).toBe('')
    expect(emailInput.value).toBe('')
  })

  test('should render correctly', () => {
    const { container } = render(<Mentor />)
    expect(container).toMatchSnapshot()
  })
})
