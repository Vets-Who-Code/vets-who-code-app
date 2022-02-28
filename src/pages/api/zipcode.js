import axios from 'axios'
import { parseString } from 'xml2js'

const USERID = process.env.ZIPCODE_GETTER_USERID

const parseXml = xml => {
  return new Promise((resolve, reject) => {
    parseString(xml, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

export default async function handler(req, res) {
  const zipcode = req.query.zipcode
  const BASE_URI =
    'https://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup&XML='

  const xml = `<CityStateLookupRequest USERID="${USERID}"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`

  try {
    const response = await axios({
      baseURL: `${BASE_URI}`,
      url: `${xml}`,
      method: 'GET',
      'Content-Type': 'text/xml',
      headers: {
        'Content-Type': 'application/xml',
      },
    })

    // console.log('response:', response.data)
    const result = await parseXml(response.data)

    if (result?.CityStateLookupResponse?.ZipCode[0]?.Error) {
      const zipcodeLookupError =
        result?.CityStateLookupResponse?.ZipCode[0]?.Error[0]?.Description[0]

      return res.status(200).json({ zipcodeLookupError })
    }

    if (result?.CityStateLookupResponse?.ZipCode[0]?.City[0]) {
      const city = result?.CityStateLookupResponse?.ZipCode[0]?.City[0]
      const state = result?.CityStateLookupResponse?.ZipCode[0]?.State[0]

      return res.status(200).json({
        city,
        state,
      })
    }
  } catch (err) {
    return res.status(500).json({ body: err.message })
  }
}
