import { render } from '@testing-library/react'
import Footer from '@/components/Footer'
import { createMocks } from 'node-mocks-http'
import { mswServer, rest } from '@/mocks/msw-server'
import contactApiHandler from '@/api/contact'

describe('<Footer />', () => {
  test('should render correctly', () => {
    const { container } = render(<Footer />)
    expect(container.firstChild).toMatchSnapshot()
  })
})
describe('contact handler', () => {
  test('should return 200 and success message', async () => {
    const body = {
      email: 'jody@mail.com',
      message: 'hello world',
    }

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      body: JSON.stringify(body),
    })

    await contactApiHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getData()).toBe('{"message":"SUCCESS"}')
  })

  test('should return 422 error when parameters missing', async () => {
    const body = {
      email: '',
      message: 'hello world',
    }

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      body: JSON.stringify(body),
    })

    await contactApiHandler(req, res)

    expect(res._getStatusCode()).toBe(422)
    expect(res._getData()).toBe('{"error":"Missing or incorrect required property"}')
  })

  test('should throw error when failing to complete post to slack api', async () => {
    // override default behaviour of handler use mock service worker to simulate a failed post to slack api
    mswServer.use(
      rest.post('https://hooks.slack.com/services/*', async (_, res, ctx) => {
        return res(ctx.status(500), ctx.json({}))
      })
    )

    const body = {
      email: 'jody@mail.com',
      message: 'hello world',
    }

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      body: JSON.stringify(body),
    })

    await contactApiHandler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(res._getData()).toBe('{"message":"Failed post to #contact channel"}')
  })
})
