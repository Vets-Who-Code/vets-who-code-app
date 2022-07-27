import { render } from '@testing-library/react'
import TemplateWrapper from '@/components/Layout'
import * as nextRouter from 'next/router'

describe('<Layout />', () => {
  nextRouter.useRouter.mockImplementation(() => ({ route: '/' }))

  test('should render correctly', () => {
    const { container } = render(<TemplateWrapper />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
