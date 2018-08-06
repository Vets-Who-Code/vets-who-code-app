import React from 'react'
import Contact from '../../src/pages/contact'

describe('<Contact />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<Contact />))

  test('should update state handleChange is invoked', () => {
    const mockEvent = {
      target: {
        name: 'name',
        value: 'User Name'
      }
    }
    wrapper.instance().handleChange(mockEvent)
    expect(wrapper.state('name')).toEqual('User Name')
  })

  test('should call fetch with correct options when handleSubmit is invoked', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve())
    const mockEvent = {
      preventDefault: jest.fn()
    }
    wrapper.setState({
      name: 'user name',
      email: 'me@mail.com',
      phone: '555-555-555',
      message: 'I want to join'
    })
    const mockUrl = 'https://eec3hqm275.execute-api.us-east-1.amazonaws.com/prod/contact'
    const mockOptions = {
      method: 'POST',
      body: JSON.stringify({
        name: 'user name',
        email: 'me@mail.com',
        phone: '555-555-555',
        message: 'I want to join'
      })
    }
    wrapper.instance().handleSubmit(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(mockUrl, mockOptions)
  })

  test('should invoke resetForm when handleSubmit is invoked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'resetForm')
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve())
    const mockEvent = {
      preventDefault: jest.fn()
    }
    wrapper.instance().handleSubmit(mockEvent)
    expect(spy).toHaveBeenCalled()
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
