import React from 'react'
import { CodePNG as CodeImage  } from '../../src/components/CodeImage'
import { render } from "react-testing-library"

describe('<CodePNG />', () => {
  let wrapper
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

  beforeEach(() => wrapper = render(<CodeImage data={data} width={690} />))

  test('should render correctly', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
