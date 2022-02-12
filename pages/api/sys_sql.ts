import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Sale } from '../add'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      const parsedReq = JSON.parse(req.body)
      switch (parsedReq.mode) {
        case 'sql':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
        connection.query(
          parsedReq.sql,
          function (error, results, fields) {
            if (error) {
              res.status(500).json({ error: String(error) })
            } else {
              res.status(202).json({ data: results})
              resolve(null)
            }
          }
        )  })
        break
        default:
          res.status(404).json({ data: '!api default case' })
          resolve(null)
          break

        }
      }})
    }
    