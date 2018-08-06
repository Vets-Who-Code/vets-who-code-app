import React from 'react'
import Nav from '../../src/components/Nav'

describe('<Nav />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<Nav />))

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
