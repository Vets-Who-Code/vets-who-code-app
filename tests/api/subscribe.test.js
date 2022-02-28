import { createMocks } from 'node-mocks-http'
import { mswServer, rest } from '@/mocks/msw-server'
import subscribeApiHandler from '@/api/subscribe'

describe('subscribe handler', () => {
  test('should return 200 and success message', async () => {
    const body = {
      email: 'jody@mail.com',
    }

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      body: JSON.stringify(body),
    })

    await subscribeApiHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getData()).toBe('{"message":"SUCCESS"}')
  })

  test('should return 422 error when parameters missing', async () => {
    const body = {}

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      body: JSON.stringify(body),
    })

    await subscribeApiHandler(req, res)

    expect(res._getStatusCode()).toBe(422)
    expect(res._getData()).toBe('{"error":"Missing or incorrect required property"}')
  })

  test('should throw error when failing to complete post to mailchimp api', async () => {
    // override default behaviour of handler use mock service worker to simulate a failed post to slack api
    mswServer.use(
      rest.post('https://us4.api.mailchimp.com/*', async (_, res, ctx) => {
        return res(ctx.status(500), ctx.json({}))
      })
    )

    const body = {
      email: 'jody@mail.com',
    }

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      body: JSON.stringify(body),
    })

    await subscribeApiHandler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(res._getData()).toBe('{"message":"Failed to post to subscribed user to mailchimp"}')
  })
})
