import { createMocks } from 'node-mocks-http'
import axios from 'axios'
import { mswServer, rest } from '@/mocks/msw-server'
import zipcodeApiHandler from '@/api/zipcode'

axios.defaults.adapter = require('axios/lib/adapters/http')

describe('zipcode handler', () => {
  test('should return 200 and success message', async () => {
    const expected = '{"city":"BEVERLY HILLS","state":"CA"}'

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      query: {
        zipcode: '90210',
      },
    })

    await zipcodeApiHandler(req, res)

    expect(res._getStatusCode()).toEqual(200)
    expect(res._getData()).toEqual(expected)
  })

  test('handles API fetch failure when zipcode invalid', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      query: {
        zipcode: '999999',
      },
    })

    await zipcodeApiHandler(req, res)

    expect(res._getStatusCode()).toEqual(200)
    expect(res._getData()).toEqual('{"zipcodeLookupError":"Invalid Zip Code."}')
  })

  test('handles when API rejects', async () => {
    // override default behaviour of handler use mock service worker to simulate a failed post to slack api
    mswServer.use(
      rest.get('https://production.shippingapis.com/*', async (_, res, ctx) => {
        return res(ctx.status(500), ctx.json({}))
      })
    )

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      query: {
        zipcode: '999999',
      },
    })

    await zipcodeApiHandler(req, res)

    expect(res._getStatusCode()).toEqual(500)
    expect(res._getData()).toEqual('{"body":"Request failed with status code 500"}')
  })
})
