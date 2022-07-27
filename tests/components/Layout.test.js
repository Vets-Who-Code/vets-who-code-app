import { render } from '@testing-library/react'
import TemplateWrapper from '@/components/Layout'

describe('<Layout />', () => {
  const useRouter = jest.spyOn(require('next/router'), 'useRouter')
  useRouter.mockImplementation(() => ({
    pathname: '/',
  }))

  test('should render correctly', () => {
    const { container } = render(<TemplateWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
