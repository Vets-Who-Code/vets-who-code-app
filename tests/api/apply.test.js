import { createMocks } from 'node-mocks-http'
import { mswServer, rest } from '@/mocks/msw-server'
import applyApiHandler from '@/api/apply'

describe('contact handler', () => {
  test('should return 200 and success message', async () => {
    const body = {
      firstName: 'Jody',
      lastName: 'Buster',
      email: 'jody@mail.com',
      city: 'Jodyville',
      state: 'JodyState',
      zipCode: 12345,
      country: 'USA',
      branchOfService: 'All of them',
      yearJoined: '1990',
      yearSeparated: '1990',
      twitterAccountName: '@mrstealyoursignificantother',
      linkedInAccountName: 'https://linkedin.com/in/mrstealyoursignificantother',
      githubAccountName: 'https://linkedin.com/in/mrstealyoursignificantother',
      preworkLink: "https://I-didn't-do-the-work",
      preworkRepo: "https://I-didn't-do-the-work",
    }

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      body: JSON.stringify(body),
    })

    await applyApiHandler(req, res)

    expect(res._getStatusCode()).toBe(200)
    expect(res._getData()).toBe('{"message":"SUCCESS"}')
  })

  test('should return 422 error when parameters incorrect', async () => {
    const body = {
      firstName: '', // invalid
      // eslint-disable-next-line
      last_name: 'Buster', // incorrect format
      email: 'jody@mail.com',
      city: 'Jodyville',
      state: 'JodyState',
      zipCode: 12345,
      country: 'USA',
      branchOfService: 'All of them',
      yearJoined: '1990',
      yearSeparated: '1990',
      twitterAccountName: '@mrstealyoursignificantother',
      linkedInAccountName: 'https://linkedin.com/in/mrstealyoursignificantother',
      githubAccountName: 'https://linkedin.com/in/mrstealyoursignificantother',
      preworkLink: "https://I-didn't-do-the-work",
      preworkRepo: "https://I-didn't-do-the-work",
    }

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      body: JSON.stringify(body),
    })

    await applyApiHandler(req, res)

    expect(res._getStatusCode()).toBe(422)
    expect(res._getData()).toBe(
      '{"message":"Missing or incorrect required property","errors":true}'
    )
  })

  test('should throw error when failing to complete post to slack api', async () => {
    // override default behaviour of handler use mock service worker to simulate a failed post to slack api
    mswServer.use(
      rest.post('https://hooks.slack.com/services/*', async (_, res, ctx) => {
        return res(ctx.status(500), ctx.json({}))
      })
    )

    const body = {
      firstName: 'Jody',
      lastName: 'Buster',
      email: 'jody@mail.com',
      city: 'Jodyville',
      state: 'JodyState',
      zipCode: 12345,
      country: 'USA',
      branchOfService: 'All of them',
      yearJoined: '1990',
      yearSeparated: '1990',
      twitterAccountName: '@mrstealyoursignificantother',
      linkedInAccountName: 'https://linkedin.com/in/mrstealyoursignificantother',
      githubAccountName: 'https://linkedin.com/in/mrstealyoursignificantother',
      preworkLink: "https://I-didn't-do-the-work",
      preworkRepo: "https://I-didn't-do-the-work",
    }

    const { req, res } = createMocks({
      method: 'POST',
      statusCode: 200,
      body: JSON.stringify(body),
    })

    await applyApiHandler(req, res)

    expect(res._getStatusCode()).toBe(500)
    expect(res._getData()).toBe('{"message":"Failed post to #apply channel"}')
  })
})
