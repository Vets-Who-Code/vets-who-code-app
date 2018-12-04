import React from 'react'
import DonateModal from '../../src/components/DonateModal'
import { render } from 'react-testing-library'

describe('<DonateModal />', () => {
  test('should render correctly', () => {
    const { container } = render(<DonateModal />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
