import React from 'react'
import Donate from '../../src/pages/donate'
import { render, screen } from '@testing-library/react'

describe('<Donate />', () => {
  test('should include donation form iFrame', () => {
    const { container } = render(<Donate />)

    const iFrame = container.querySelector('iframe')
    const donorUrl = 'https://donorbox.org/embed/vetswhocode-donation?show_content=true'

    expect(iFrame).toBeInTheDocument()
    expect(iFrame.contentWindow.document.location.href).toEqual(donorUrl)
  })
})
