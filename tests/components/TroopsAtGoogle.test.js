import React from 'react'
import { TroopsAtGoogleImage as TroopsAtGoogle } from '../../src/components/TroopsAtGoogle'
import { render } from '@testing-library/react'

describe('<TroopsAtGoogle />', () => {
  const data = {
    file: {
      childImageSharp: {
        fluid: {
          aspectRatio: 600,
          src: 'some-source-here',
          srcSet: 'some-source-here',
          sizes: '',
          base64: '',
        },
      },
    },
  }

  test('should render correctly', () => {
    const { container } = render(<TroopsAtGoogle data={data} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
