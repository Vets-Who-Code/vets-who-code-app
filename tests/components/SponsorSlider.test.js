import React from 'react'
import SponsorSlider from '../../src/components/SponsorSlider'
import { render } from 'react-testing-library'

describe('<SponsorSlider />', () => {
  test('should render correctly', () => {
    const { container } = render(<SponsorSlider />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
