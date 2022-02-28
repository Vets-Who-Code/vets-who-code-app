import { render } from '@testing-library/react'
import Nav from '@/components/Nav'

describe('<Nav />', () => {
  test('should render correctly', () => {
    const { container } = render(<Nav />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
