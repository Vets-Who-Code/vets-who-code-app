import { render, act } from '@testing-library/react'
import Countdown from '@/components/Countdown'

describe('<Countdown />', () => {
  jest.useFakeTimers()
  test('should unmount and clear interval to prevent memory leaks', () => {
    const { unmount } = render(<Countdown nextClass="March 21, 5050" />)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    act(() => jest.runOnlyPendingTimers())
    unmount()
    expect(console.error).not.toHaveBeenCalled()
  })

  test('should render countdown when class is a future date', () => {
    const { getByText } = render(<Countdown nextClass="March 21, 5050" />)
    expect(getByText(/Days/)).toBeInTheDocument()
    expect(getByText(/Hours/)).toBeInTheDocument()
    expect(getByText(/Minutes/)).toBeInTheDocument()
    expect(getByText(/Seconds/)).toBeInTheDocument()
  })

  test('should render class in session message when past class date', () => {
    const { getByText } = render(<Countdown nextClass="March 21, 1999" />)
    expect(getByText(/Class Is In Session/)).toBeInTheDocument()
  })
})
