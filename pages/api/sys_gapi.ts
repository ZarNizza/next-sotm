import type { NextApiRequest, NextApiResponse } from 'next'

import { google } from 'googleapis'

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_ID,
  process.env.GOOGLE_SECRET,
  process.env.GOOGLE_REDIRECT_URL
)

const drive = google.drive({
  version: 'v2',
  auth: oauth2Client
})
const people = google.people('v1')
const apis = google.getSupportedAPIs()

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    if (req.method === 'GET') {
      const parsedReq = JSON.parse(req.body)
      switch (parsedReq.mode) {
        case 'apis':
          console.log('people: ', people)
          console.log('/////////// ')
          console.log('apis: ', apis)
          res.status(202).json({ data: apis })

          break
        default:
          res.status(404).json({ data: '!gapi default case' })
          resolve(null)
          break
      }
    }
  })
}
