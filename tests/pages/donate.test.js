import { render } from '@testing-library/react'
import Donate from '../../src/pages/donate'

describe('<Donate />', () => {
  test('should include donation form iFrame', () => {
    const { container } = render(<Donate />)

    const iFrame = container.querySelector('iframe')
    const donorUrl = 'https://donorbox.org/embed/vetswhocode-donation?show_content=true'

    expect(iFrame).toBeInTheDocument()
    expect(iFrame.contentWindow.document.location.href).toEqual(donorUrl)
  })
})
