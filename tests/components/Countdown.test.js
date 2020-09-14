import React from 'react'
import Countdown from '../../src/components/Countdown'
import { render } from '@testing-library/react'
import { advanceBy, advanceTo, clear } from 'jest-date-mock'

describe('<Countdown />', () => {
  test('should unmount and clear interval to prevent memory leaks', () => {
    const { unmount } = render(<Countdown nextClass="2021-03-01" />)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.runOnlyPendingTimers()
    unmount()
    // eslint-disable-next-line
    expect(console.error).not.toHaveBeenCalled()
    jest.useFakeTimers()
  })

  test.only('should render countdown', () => {
    jest.useRealTimers()
    const { container, debug } = render(<Countdown nextClass="2021-03-01" />)
    debug()
  })
})
