import { render } from '@testing-library/react'
import BoardCards from '@/components/Board'

describe('<BoardCards />', () => {
  let mockContentfulContent
  beforeEach(() => {
    mockContentfulContent = [
      {
        fields: {
          id: 'new-id-2',
          bio: 'Second user bio',
          linkedin: 'https://www.linkedin.com/in/jodynelson',
          twitter: 'https://www.twitter.com/jodynelson',
          work: 'Fake Job',
          firstName: 'Jody',
          lastName: 'Nelson',
          image: {
            fields: {
              file: {
                url: 'facke src',
                width: 400,
                height: 400,
              },
            },
          },
        },
      },
      {
        fields: {
          bio: 'First user bio',
          linkedin: 'https://www.linkedin.com/in/jodysmith',
          twitter: 'https://www.twitter.com/jodysmith',
          work: 'My cool Job',
          firstName: 'Jody',
          lastName: 'Smith',
          image: {
            fields: {
              file: {
                url: 'facke url',
                width: 400,
                height: 400,
              },
            },
          },
        },
      },
      {
        fields: {
          id: 'new-id-3',
          bio: 'Third user bio',
          linkedin: 'https://www.linkedin.com/in/jodyzander',
          twitter: 'https://www.twitter.com/jodyzander',
          work: 'Jody Job',
          firstName: 'Jody',
          lastName: 'Zander',
          image: {
            fields: {
              file: {
                url: 'facke src',
                width: 400,
                height: 400,
              },
            },
          },
        },
      },
    ]
  })

  test('should handle case when linkedin url is not present', () => {
    // mutate mock data
    delete mockContentfulContent[0].fields.linkedin

    const { container } = render(<BoardCards boardMemberCollection={mockContentfulContent} />)
    const linkTags = container.querySelectorAll('a')

    expect(linkTags.length).toBe(5)
    expect(linkTags[0].href).toBe('https://www.twitter.com/jodynelson')
    expect(linkTags[1].href).toBe('https://www.linkedin.com/in/jodysmith')
    expect(linkTags[2].href).toBe('https://www.twitter.com/jodysmith')
    expect(linkTags[3].href).toBe('https://www.linkedin.com/in/jodyzander')
    expect(linkTags[4].href).toBe('https://www.twitter.com/jodyzander')
  })

  test('should handle case when twitter url is not present', () => {
    // mutate mock data
    delete mockContentfulContent[0].fields.twitter

    const { container } = render(<BoardCards boardMemberCollection={mockContentfulContent} />)
    const linkTags = container.querySelectorAll('a')

    expect(linkTags.length).toBe(5)
    expect(linkTags[0].href).toBe('https://www.linkedin.com/in/jodynelson')
    expect(linkTags[1].href).toBe('https://www.linkedin.com/in/jodysmith')
    expect(linkTags[2].href).toBe('https://www.twitter.com/jodysmith')
    expect(linkTags[3].href).toBe('https://www.linkedin.com/in/jodyzander')
    expect(linkTags[4].href).toBe('https://www.twitter.com/jodyzander')
  })

  test('should render all dyncamic data', () => {
    const { container } = render(<BoardCards boardMemberCollection={mockContentfulContent} />)

    const nameHeadings = container.querySelectorAll('h2')
    const workHeadings = container.querySelectorAll('h3')
    const images = container.querySelectorAll('img')

    expect(nameHeadings[0].textContent).toBe('Jody Nelson')
    expect(nameHeadings[1].textContent).toBe('Jody Smith')
    expect(nameHeadings[2].textContent).toBe('Jody Zander')
    expect(workHeadings[0].textContent).toBe('Fake Job')
    expect(workHeadings[1].textContent).toBe('My cool Job')
    expect(workHeadings[2].textContent).toBe('Jody Job')
    expect(images.length).toBe(3)
  })
})
