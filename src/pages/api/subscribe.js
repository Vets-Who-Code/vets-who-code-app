import axios from 'axios'
import { checkParams } from './api-helpers'

export default async function handler(req, res) {
  const parsedBody = JSON.parse(req.body)
  const hasErrors = checkParams(parsedBody, ['email'])

  if (hasErrors) {
    return res.status(422).json({
      error: 'Missing or incorrect required property',
    })
  }

  const payload = {
    // eslint-disable-next-line camelcase
    email_address: parsedBody.email,
    status: 'subscribed',
  }

  const baseURL = `${process.env.MAILCHIMP_SUBSCRIBE_URL}`

  try {
    await axios({
      method: 'POST',
      baseURL,
      url: `${process.env.MAILCHIMP_LIST_ID}/members`,
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString(
          'base64'
        )}`,
      },
      data: payload,
    }).catch(err => {
      throw new Error(err.message)
    })

    return res.status(200).json({ message: 'SUCCESS' })
  } catch (err) {
    return res.status(500).json({ message: 'Failed to post to subscribed user to mailchimp' })
  }
}
