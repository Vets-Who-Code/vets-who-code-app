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
    const ball = container.querySelectorAll('.ball')
    const hidden = container.querySelectorAll('.hidden')
    expect(hidden.length).toBe(0)
    expect(ball.length).toBe(3)
  })

  test('should render correctly', () => {
    const { container } = render(<Loader isSubmitted={false} jobData={jobData} />)
    const loading = container.querySelectorAll('.loading')
    const hidden = container.querySelectorAll('.hidden')
    const ball = container.querySelectorAll('.ball')
    expect(hidden.length).toBe(1)
    expect(loading.length).toBe(1)
    expect(ball.length).toBe(3)
  })
})
