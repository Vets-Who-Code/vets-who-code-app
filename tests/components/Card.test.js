import { render } from '@testing-library/react'
import Card from '../../src/components/Card/Card'

describe('<Card />', () => {
  //object with correct data
  const mockCardData = {
    created: '1900-01-01',
    title: 'Test Card',
    // eslint-disable-next-line camelcase
    company: { display_name: 'Company XYZ' },
    // eslint-disable-next-line camelcase
    location: { display_name: 'Location' },
    description: 'main card info',
    // eslint-disable-next-line camelcase
    redirect_url: 'http://example.com',
  }

  //object with malformed html
  const malformedData = {
    created: '<p>>Date Posted: 12/31/1899</p>',
    title: 'Test Card</b>',
    // eslint-disable-next-line camelcase
    company: { display_name: '<i>Company XYZ<>' },
    // eslint-disable-next-line camelcase
    location: { display_name: '<br />Location' },
    // eslint-disable-next-line camelcase
    description: '<ul>main card info',
    // eslint-disable-next-line camelcase
    redirect_url: 'http://example.com',
  }

  const missingData = {
    created: '<p>>Date Posted: 12/31/1899</p>',
    title: 'Test Card</b>',
    // eslint-disable-next-line camelcase
    company: { display_name: '<i>Company XYZ<>' },
    // eslint-disable-next-line camelcase
    location: { display_name: '<br />Location' },
    // eslint-disable-next-line camelcase
    description: '<ul>main card info',
    // eslint-disable-next-line camelcase
    redirect_url: '',
  }

  const allMissingData = {
    created: null,
    title: null,
    // eslint-disable-next-line camelcase
    company: { display_name: null },
    // eslint-disable-next-line camelcase
    location: { display_name: null },
    // eslint-disable-next-line camelcase
    description: null,
    // eslint-disable-next-line camelcase
    redirect_url: null,
  }

  //object with html
  const htmlMockCardData = {
    created: '<p>Date Posted: 12/31/1899</p>',
    title: '<b>Test Card</b>',
    // eslint-disable-next-line camelcase
    company: { display_name: '<i>Company XYZ</i>' },
    // eslint-disable-next-line camelcase
    location: { display_name: '<div>Location</div>' },
    description: '<ul>main card info</ul>',
    // eslint-disable-next-line camelcase
    redirect_url: 'http://example.com',
  }

  const missingTitleMockCardData = {
    created: '1900-01-01',
    title: null,
    // eslint-disable-next-line camelcase
    company: { display_name: 'Company XYZ' },
    // eslint-disable-next-line camelcase
    location: { display_name: 'Location' },
    description: 'main card info',
    // eslint-disable-next-line camelcase
    redirect_url: 'http://example.com',
  }

  //tests that the cards render
  test('should render correctly', () => {
    const { container } = render(<Card jobData={mockCardData} />)
    const panelDivs = container.querySelectorAll('div')
    const panelBody = container.querySelectorAll('.panel-body')
    const cardBtn = container.querySelectorAll('.btn')
    const panelBottom = container.querySelectorAll('.panel-bottom')
    expect(panelDivs.length).toBe(3)
    expect(panelBody.length).toBe(1)
    expect(cardBtn.length).toBe(1)
    expect(panelBottom.length).toBe(1)
  })

  //tests the removeHTML function with correct html
  test('should return a string with no html tags', () => {
    const { container } = render(<Card jobData={htmlMockCardData} />)
    const jobDate = container.getElementsByClassName('date')
    const jobTitle = container.querySelector('h4')
    const jobCompany = container.getElementsByClassName('company')
    const jobLocation = container.getElementsByClassName('location')
    const jobDescription = container.getElementsByClassName('description')
    expect(jobDate[0].textContent).toBe('Date Posted: 12/31/1899')
    expect(jobTitle.textContent).toBe('Test Card')
    expect(jobCompany[0].textContent).toBe('Company: Company XYZ')
    expect(jobLocation[0].textContent).toBe('Location: Location')
    expect(jobDescription[0].textContent).toBe('Job Description: main card info')
  })

  //tests removeHTML function with malformed html
  test('should return a string with no html tags', () => {
    const { container } = render(<Card jobData={malformedData} />)
    const jobDate = container.getElementsByClassName('date')
    const jobTitle = container.querySelector('h4')
    const jobCompany = container.getElementsByClassName('company')
    const jobLocation = container.getElementsByClassName('location')
    const jobDescription = container.getElementsByClassName('description')
    expect(jobDate[0].textContent).toBe('Date Posted: 12/31/1899')
    expect(jobTitle.textContent).toBe('Test Card')
    expect(jobCompany[0].textContent).toBe('Company: Company XYZ')
    expect(jobLocation[0].textContent).toBe('Location: Location')
    expect(jobDescription[0].textContent).toBe('Job Description: main card info')
  })

  //tests the isValidURL function with mock data
  test('should return a valid URL', () => {
    const { container } = render(<Card jobData={mockCardData} />)
    const buttonLink = container.querySelector('a').getAttribute('href')
    const buttonText = container.querySelector('a').textContent
    expect(buttonLink).toBe('http://example.com')
    expect(buttonText).toBe('Apply')
  })

  //tests the isDataPresent function with all data
  test('should return that all data is present', () => {
    const { container } = render(<Card jobData={mockCardData} />)
    const panel = container.getElementsByClassName('panel')
    expect(panel[0]).toBeTruthy()
  })

  //tests the isDataPresent function with data missing
  test('should return that all data is NOT present', () => {
    const { container } = render(<Card jobData={missingData} />)
    expect(container.innerHTML).toBe('')
  })

  //tests the removeHTML function with data missing
  test('should return null becase no data is present', () => {
    const { container } = render(<Card jobData={allMissingData} />)
    expect(container.innerHTML).toBe('')
  })
  //tests the removeHTML function with just title data missing
  test('should return null becase title field is missing', () => {
    const { container } = render(<Card jobData={missingTitleMockCardData} />)
    expect(container.innerHTML).toBe('')
  })
})
