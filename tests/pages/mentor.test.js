import React from 'react'
import Mentor from '../../src/pages/mentor'


describe('<Mentor />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<Mentor />))

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
      name: 'User Name',
      email: 'me@mail.com',
      'branch-of-service': 'branch',
      'technical-expertise': 'typing',
      'github-portfolio-or-linkedin': 'github-url',
      location: 'some state usa',
      'employer-restrictions': 'n/a'
    })
    const mockUrl = 'https://eec3hqm275.execute-api.us-east-1.amazonaws.com/prod/mentor'
    const mockOptions = {
      method: 'POST',
      body: JSON.stringify({
        name: 'User Name',
        email: 'me@mail.com',
        'branch-of-service': 'branch',
        'technical-expertise': 'typing',
        'github-portfolio-or-linkedin': 'github-url',
        location: 'some state usa',
        'employer-restrictions': 'n/a'
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
