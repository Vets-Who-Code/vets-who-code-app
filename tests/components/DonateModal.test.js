import React from 'react'
// import DonateModal from '../../src/components/DonateModal'
import { render } from '@testing-library/react'

describe.skip('<DonateModal />', () => {
  test('should render correctly', () => {
    const { container } = render(<DonateModal />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
