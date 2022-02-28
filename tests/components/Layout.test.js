import { render } from '@testing-library/react'
import TemplateWrapper from '@/components/Layout'

describe('<Layout />', () => {
  test('should render correctly', () => {
    const { container } = render(<TemplateWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
