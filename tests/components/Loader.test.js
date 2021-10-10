import { render } from '@testing-library/react'
import Loader from '../../src/components/Loader'

const jobData = {
  created: '1900-01-01',
  title: 'Test Card',
  company: { display_name: 'Company XYZ' },
  location: { display_name: 'Location' },
  description: 'main card info',
  redirect_url: 'http://example.com',
}

describe('<Loader />', () => {
  test('should render correctly', () => {
    const { container } = render(<Loader isSubmitted={true} jobData={jobData} />)
    const loading = container.querySelectorAll('.loading')
    const ball = container.querySelectorAll('.ball')
    expect(loading.length).toBe(1)
    expect(ball.length).toBe(3)
  })

  test('should render without balls correctly', () => {
    const { container } = render(<Loader isSubmitted={false} jobData={jobData} />)
    const loading = container.querySelectorAll('.loading')
    const ball = container.querySelectorAll('.ball')
    expect(loading.length).toBe(0)
    expect(ball.length).toBe(0)
  })

  test('should render without balls correctly if submited but has API error', () => {
    jobData.error = true
    const { container } = render(<Loader isSubmitted={true} jobData={jobData} />)
    const ball = container.querySelectorAll('.ball')
    const loading = container.querySelectorAll('.loading')
    expect(ball.length).toBe(0)
    expect(loading.length).toBe(0)
  })
})
