import { render } from '@testing-library/react'
import Pagination from '../../src/components/Pagination'

describe('<Pagination />', () => {
  const pageContext = {
    currentPage: 1,
    totalPages: 2,
    minPage: 1,
    maxPage: 100,
  }

  test('should render route correctly', () => {
    const { container } = render(
      <Pagination pageContext={pageContext} type={'route'} path={'blog'} />
    )
    const navTags = container.querySelectorAll('nav')
    const anchorTags = container.querySelectorAll('a')
    const lineTags = container.querySelectorAll('li')
    expect(anchorTags.length).toBe(3)
    expect(navTags.length).toBe(1)
    expect(lineTags.length).toBe(3)
  })

  test('test nav / anchor tags contain attribute path in href', () => {
    const { container } = render(
      <Pagination pageContext={pageContext} type={'route'} path={'blog'} />
    )
    const anchorTags = container.querySelectorAll('a')
    expect(anchorTags[0]).toHaveAttribute('href', '/blog/')
    expect(anchorTags[1]).toHaveAttribute('href', '/blog/2')
    expect(anchorTags[2]).toHaveAttribute('href', '/blog/2')
  })

  test('should render api correctly', () => {
    const { container } = render(<Pagination pageContext={pageContext} type={'api'} />)
    const navTags = container.querySelectorAll('nav')
    const spanTags = container.querySelectorAll('span')
    expect(spanTags.length).toBe(99)
    expect(navTags.length).toBe(1)
  })
})
