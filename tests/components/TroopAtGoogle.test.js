import React from 'react'
import { TroopsAtGoogleImage  } from '../../src/components/TroopsAtGoogle'
import { render } from "react-testing-library"

describe('<TroopsAtGoogle />', () => {
  const data = {
    query: '',
    file: {
      childImageSharp: {
        fluid: {
          aspectRatio: 600,
          src: 'some-source-here',
          srcSet: 'some-source-here',
          sizes: '',
          base64: '',
        }
      },
    },
  }

  test('should render correctly', () => {
    const { container } = render(<TroopsAtGoogleImage data={data} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
