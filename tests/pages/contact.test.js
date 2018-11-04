import React from 'react'
import Contact from '../../src/pages/contact'
import { render, fireEvent } from 'react-testing-library'

describe('<Contact />', () => {
  // test('should update state handleChange is invoked', () => {
  //   const mockEvent = {
  //     target: {
  //       name: 'name',
  //       value: 'User Name'
  //     }
  //   }
  //   wrapper.instance().handleChange(mockEvent)
  //   expect(wrapper.state('name')).toEqual('User Name')
  // })

  // test('should call fetch with correct options when handleSubmit is invoked', () => {
  //   window.fetch = jest.fn().mockImplementation(() => Promise.resolve())
  //   const mockEvent = {
  //     preventDefault: jest.fn()
  //   }
  //   wrapper.setState({
  //     name: 'user name',
  //     email: 'me@mail.com',
  //     phone: '555-555-555',
  //     message: 'I want to join'
  //   })
  //   const mockUrl = 'https://eec3hqm275.execute-api.us-east-1.amazonaws.com/prod/contact'
  //   const mockOptions = {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       name: 'user name',
  //       email: 'me@mail.com',
  //       phone: '555-555-555',
  //       message: 'I want to join'
  //     })
  //   }
  //   wrapper.instance().handleSubmit(mockEvent)
  //   expect(window.fetch).toHaveBeenCalledWith(mockUrl, mockOptions)
  // })

  // test('should invoke resetForm when handleSubmit is invoked', () => {
  //   const spy = jest.spyOn(wrapper.instance(), 'resetForm')
  //   window.fetch = jest.fn().mockImplementation(() => Promise.resolve())
  //   const mockEvent = {
  //     preventDefault: jest.fn()
  //   }
  //   wrapper.instance().handleSubmit(mockEvent)
  //   expect(spy).toHaveBeenCalled()
  // })

  test('should submit subscription form', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      status: 200,
    }))
    const { container, debug } = render(<Contact />)
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
