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

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
