import React from 'react'
import Header from '../../src/components/Header'

describe('<Header />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<Header />))

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
