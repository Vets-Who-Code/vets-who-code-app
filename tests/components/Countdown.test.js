import React from 'react'
import Countdown from '../../src/components/Countdown'

describe('<Countdown />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(
    <Countdown />
  ))

  test('should render correctly', () => {
    wrapper.setState({
      days: 1,
      hours: 1,
      minutes: 27,
      seconds: 30
    })
    expect(wrapper).toMatchSnapshot()
  })
})
