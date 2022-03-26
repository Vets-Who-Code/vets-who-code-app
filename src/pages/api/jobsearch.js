import axios from 'axios'

const APP_ID = process.env.JOBSEARCH_API_ID
const APP_KEY = process.env.JOBSEARCH_API_KEY

export default async function handler(req, res) {
  //Get page Number
  let page = req?.query?.page || 1

  //Base URL
  const BASE_URI = 'https://api.adzuna.com/v1/api/jobs/us/search/'

  //Add Page Number
  let urlParams = `${page}?app_id=${APP_ID}&app_key=${APP_KEY}`

  for (const property in req.query) {
    if (property !== 'page') {
      urlParams += `&${property}=${req.query[property]}`
    }
  }

  try {
    const response = await axios({
      method: 'GET',
      baseURL: `${BASE_URI}`,
      url: `${urlParams}`,
    })

    if (response.status >= 300) {
      return res.status(response.status).json(response.statusText)
    }

    return res.status(200).json(response.data)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}
