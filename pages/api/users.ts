// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { User } from '../users'

type ApiData = {
  data?: User[]
  error?: string
}

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiData>
) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      const parsedReq = JSON.parse(req.body)
      connection.query(
        'INSERT INTO users (uname, uphone, timezone) VALUES (?, ?, ?)',
        [
          parsedReq.uname.substring(0, 50),
          parsedReq.uphone.substring(0, 20),
          parsedReq.timezone.substring(0, 2)
        ],
        function (error, results, fields) {
          if (error) {
            res.status(500).json({ error: String(error) })
          } else {
            res.status(201).json({ data: results as User[] })
          }
          resolve(null)
        }
      )
    } else if (req.method === 'GET') {
      connection.query(
        'SELECT * FROM customers',
        function (error, results, fields) {
          if (error) {
            res.status(500).json({ error: String(error) })
          } else {
            res.status(200).json({ data: (results as User[]) || [] })
          }
          resolve(null)
        }
      )
    }
  })
}
