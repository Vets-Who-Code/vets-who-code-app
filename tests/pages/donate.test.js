import React from 'react'
import Donate from '../../src/pages/donate'
import { render, fireEvent } from 'react-testing-library'

describe('<Donate />', () => {
  test.skip('should open modal on click ', async () => {
    const { container } = render(<Donate />)
    const donateButton = container.querySelector('.dbox-donation-button')
    fireEvent.click(donateButton)
    fireEvent.click(donateButton)
    expect(container.querySelector('.ReactModalPortal')).toBeNull()
  })

  test('should render correctly', () => {
    const { container } = render(<Donate />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
