import React from 'react'
import Countdown from '../../src/components/Countdown'
import { render } from '@testing-library/react'

jest.useFakeTimers()

describe('<Countdown />', () => {
  test('should unmount and clear interval to prevent memory leaks', () => {
    const { unmount } = render(<Countdown />)

    jest.spyOn(console, 'error').mockImplementation(() => {})
    jest.runOnlyPendingTimers()
    unmount()
    // eslint-disable-next-line
    expect(console.error).not.toHaveBeenCalled()
  })
})
