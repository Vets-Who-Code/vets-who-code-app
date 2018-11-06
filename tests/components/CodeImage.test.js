import React from 'react'
import { PureCodeImage as CodeImage  } from '../../src/components/CodeImage'
import { render } from "react-testing-library"

describe('<CodePNG />', () => {
  const data = {
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
    const { container } = render(<CodeImage data={data} width={690} />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
