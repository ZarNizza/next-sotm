import type { NextApiRequest, NextApiResponse } from 'next'

const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.PG_URI,
  ssl: {
    rejectUnauthorized: false
  }
})
client.connect()

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      const parsedReq = JSON.parse(req.body)
      switch (parsedReq.mode) {
        case 'sql':
          client.query(parsedReq.sqlString, [], (err: any, results: any) => {
            if (err) {
              res.status(500).json({
                error: String(err)
              })
              resolve(null)
            } else {
              res.status(202).json({ data: results.rows })
              resolve(null)
            }
            console.log(err ? err.stack : results.rows)
          })

          break
        default:
          res.status(404).json({ data: '!api default case' })
          resolve(null)
          break
      }
    }
  })
}
