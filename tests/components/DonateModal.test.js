import React from 'react'
import DonateModal from '../../src/components/DonateModal'

describe('<DonateModal />', () => {
  let wrapper

  beforeEach(() => wrapper = shallow(<DonateModal />))

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})