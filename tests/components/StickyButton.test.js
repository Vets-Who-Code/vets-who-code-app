import React from 'react'
import StickyButton from '../../src/components/StickyButton'

describe('<StickyButton />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<StickyButton />))

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
