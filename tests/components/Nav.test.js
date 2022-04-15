import { render } from '@testing-library/react'
import Nav from '@/components/Nav'
import * as nextRouter from 'next/router'

describe('<Nav />', () => {
  nextRouter.useRouter = jest.fn() // eslint-disable-line
  nextRouter.useRouter.mockImplementation(() => ({ route: '/' }))
  test('should render correctly', () => {
    const { container } = render(<Nav />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
