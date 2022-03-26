import { render } from '@testing-library/react'
import Header from '@/components/Header'

describe('<Header />', () => {
  test('should render correctly', () => {
    const { container } = render(<Header />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
