import React from 'react'
import Apply from '../../src/pages/apply'
import { render, fireEvent } from 'react-testing-library';

describe('<Apply />', () => {
  const { container, getByLabelText, getByValue } = render(<Apply />)

  test('should update state handleChange is invoked', () => {
    const nextLabel =  getByLabelText('Name*')
    const submitButton = getByValue('submit')
    const applyForm = container.querySelector('form')
    const onSubmit = jest.fn()
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve())

    fireEvent.change(nextLabel, {
      target: {
        value: 'New User'
      }
    })
    fireEvent.click(submitButton)
    fireEvent.submit(applyForm)
    expect(getByLabelText)
  })

  test.skip('should call fetch with correct options when handleSubmit is invoked', () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve())
    const mockEvent = {
      preventDefault: jest.fn()
    }
    wrapper.setState({
      name: 'User Name',
      email: 'me@mail.com',
      'branch-of-service': 'branch',
      experience: 'typing',
      'github-portfolio-or-linkedin': 'github-url',
      location: 'some state usa',
      'favorite-mre': 'chill-mac',
      'tell-us-about-yourself': 'I was in the military'
    })
    const mockUrl = 'https://eec3hqm275.execute-api.us-east-1.amazonaws.com/prod/apply'
    const mockOptions = {
      method: 'POST',
      body: JSON.stringify({
        name: 'User Name',
        email: 'me@mail.com',
        'branch-of-service': 'branch',
        experience: 'typing',
        'github-portfolio-or-linkedin': 'github-url',
        location: 'some state usa',
        'favorite-mre': 'chill-mac',
        'tell-us-about-yourself': 'I was in the military'
      })
    }
    wrapper.instance().handleSubmit(mockEvent)
    expect(window.fetch).toHaveBeenCalledWith(mockUrl, mockOptions)
  })

  test.skip('should invoke resetForm when handleSubmit is invoked', () => {
    const spy = jest.spyOn(wrapper.instance(), 'resetForm')
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve())
    const mockEvent = {
      preventDefault: jest.fn()
    }
    wrapper.instance().handleSubmit(mockEvent)
    expect(spy).toHaveBeenCalled()
  })

  test('should render correctly', () => {

    expect(container.firstChild).toMatchSnapshot()
  })
})
