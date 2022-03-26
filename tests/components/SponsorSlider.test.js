import { render } from '@testing-library/react'
import SponsorSlider from '@/components/SponsorSlider'

describe('<SponsorSlider />', () => {
  test('should render correctly', () => {
    const { container } = render(<SponsorSlider />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
