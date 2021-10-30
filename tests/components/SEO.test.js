import SEO from '../../src/components/SEO'
import { render } from '@testing-library/react'
import { LocationProvider } from '@reach/router'
import Helmet from 'react-helmet'

jest.mock('gatsby')

describe('<SEO />', () => {
  test('should render default value', () => {
    render(
      <LocationProvider>
        <SEO />
      </LocationProvider>
    )
    const helmet = Helmet.peek()
    expect(helmet.title).toBe('#VetsWhoCode 🇺🇸 ')
    expect.arrayContaining([
      {
        name: 'image',
        content: 'https://www.vetswhocode.io/images/meta-image.jpg',
      },
      { itemprop: 'name', content: '#VetsWhoCode 🇺🇸 ' },
      { name: 'description', content: 'words in quotes' },
      {
        itemprop: 'image',
        content: 'https://www.vetswhocode.io/images/meta-image.jpg',
      },
      { property: 'og:url', content: 'https://www.vetswhocode.io/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: '#VetsWhoCode 🇺🇸 ' },
      { property: 'og:description', content: 'words in quotes' },
      {
        property: 'og:image',
        content: 'https://www.vetswhocode.io/images/meta-image.jpg',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: '#VetsWhoCode 🇺🇸 ' },
      { name: 'twitter:creator', content: '@vetswhocode' },
      { name: 'twitter:description', content: 'words in quotes' },
      {
        name: 'twitter:image',
        content: 'https://www.vetswhocode.io/images/meta-image.jpg',
      },
    ])
  })

  test('should override default value', () => {
    render(
      <LocationProvider>
        <SEO title="hello world" image="some-fake-url.com" />
      </LocationProvider>
    )
    const helmet = Helmet.peek()
    expect(helmet.title).toBe('hello world')
    expect(helmet.metaTags).toEqual([
      {
        name: 'image',
        content: 'https:some-fake-url.com',
      },
      { itemprop: 'name', content: '#VetsWhoCode 🇺🇸 ' },
      { name: 'description', content: 'words in quotes' },
      {
        itemprop: 'image',
        content: 'https:some-fake-url.com',
      },
      { property: 'og:url', content: 'https://www.vetswhocode.io/' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'hello world' },
      { property: 'og:description', content: 'words in quotes' },
      {
        property: 'og:image',
        content: 'https:some-fake-url.com',
      },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: '#VetsWhoCode 🇺🇸 ' },
      { name: 'twitter:creator', content: '@vetswhocode' },
      { name: 'twitter:description', content: 'words in quotes' },
      {
        name: 'twitter:image',
        content: 'https:some-fake-url.com',
      },
    ])
  })
})
