import axios from 'axios'
import { checkParams } from './api-helpers'

export default async function handler(req, res) {
  const parsedBody = JSON.parse(req.body)
  const requiredParams = [
    'name',
    'email',
    'branch-of-service',
    'technical-expertise',
    'github-portfolio-or-linkedin',
    'location',
    'employer-restrictions',
  ]
  const hasErrors = checkParams(parsedBody, requiredParams)

  if (hasErrors) {
    return res.status(422).json({
      error: 'Missing or incorrect required property',
    })
  }

  const text = [
    `Name \`${parsedBody.name}\``,
    `\nEmail \`${parsedBody.email}\``,
    `\nBranch of Service \`${parsedBody['branch-of-service']}\``,
    `\nTechnical Expertise \`${parsedBody['technical-expertise']}\``,
    `\nGithub, Portfolio or LinkedIn \`${parsedBody['github-portfolio-or-linkedin']}\``,
    `\nLocation \`${parsedBody.location}\``,
    `\nEmployer Restrictions \`${parsedBody['employer-restrictions']}\``,
  ].join()

  const payload = JSON.stringify({ text })

  try {
    await axios({
      method: 'POST',
      baseURL: 'https://hooks.slack.com',
      url: `/services/${process.env.MENTOR_WEBHOOK_ID}`,
      data: payload,
    }).catch(err => {
      throw new Error(err.message)
    })

    return res.status(200).json({ message: 'SUCCESS' })
  } catch (err) {
    return res.status(500).json({ message: 'Failed post to #mentor channel' })
  }
}
