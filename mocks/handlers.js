import { rest } from 'msw'

/**
 * The handlers description
 * @export handlers[] list of handlers
 */
export const handlers = [
  // mock slack reuqests
  rest.post('https://hooks.slack.com/services/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ok: true }))
  }),
  rest.post('https://us4.api.mailchimp.com/3.0/lists/*', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({ ok: true }))
  }),
  rest.get('https://production.shippingapis.com/*', (req, res, ctx) => {
    let mockPostalCodeResponse =
      '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<CityStateLookupResponse><ZipCode ID="0"><Zip5>90210</Zip5><City>BEVERLY HILLS</City><State>CA</State></ZipCode></CityStateLookupResponse>'
    let hasInvalidZip = false

    req.url.searchParams.forEach(value => {
      // mock failed zipcode lookup
      if (value.indexOf('99999') > -1) {
        hasInvalidZip = true
      }
    })

    if (hasInvalidZip) {
      mockPostalCodeResponse =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<CityStateLookupResponse><ZipCode ID="0"><Error><Number>-2147219399</Number><Source>WebtoolsAMS;CityStateLookup</Source><Description>Invalid Zip Code.</Description><HelpFile/><HelpContext/></Error></ZipCode></CityStateLookupResponse>'
    }

    return res(ctx.status(200), ctx.xml(mockPostalCodeResponse))
  }),
]
