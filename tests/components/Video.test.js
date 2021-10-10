import { render } from '@testing-library/react'
import Video from '../../src/components/Video/Video'

const renderIgnoringUnstableFlushDiscreteUpdates = Component => {
  const originalError = console.error
  const error = jest.fn()
  console.error = error
  const result = render(Component)
  expect(error).toHaveBeenCalledTimes(1)
  expect(error).toHaveBeenCalledWith(
    'Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.%s',
    expect.any(String)
  )
  console.error = originalError

  return result
}

describe('<Video />', () => {
  test('should render correctly', () => {
    const { container } = renderIgnoringUnstableFlushDiscreteUpdates(<Video isSubmitted={false} />)
    const videoTag = container.querySelector('.veteran-video ')
    expect(videoTag).toBeInTheDocument()
    expect(videoTag.classList.contains('hidden')).toBe(false)
  })

  test('should contain class hidden when isSubmitted is true', () => {
    const { container } = renderIgnoringUnstableFlushDiscreteUpdates(<Video isSubmitted={true} />)
    const videoTag = container.querySelector('.veteran-video ')
    expect(videoTag.classList.contains('hidden')).toBe(true)
  })
})
