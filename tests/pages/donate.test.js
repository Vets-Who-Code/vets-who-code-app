import React from 'react'
import Donate from '../../src/pages/donate'

describe('<Donate />', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(<Donate />)
  })

  test('should set modalIsOpen to true when button is clicked', () => {
    wrapper.find('button').simulate('click')
    expect(wrapper.state('modalIsOpen')).toBe(true)
  })

  test('should set modalIsOpen to false when clicking outside modal', () => {
    wrapper.setState({ modalIsOpen: true })
    wrapper.instance().closeModal()
    wrapper.instance().forceUpdate()
    expect(wrapper.state('modalIsOpen')).toBe(false)
  })

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
