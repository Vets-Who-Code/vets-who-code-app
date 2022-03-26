import { render } from '@testing-library/react'
import Footer from '@/components/Footer'

describe('<Footer />', () => {
  test('should render correctly', () => {
    const { container } = render(<Footer />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
