import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Eitem } from '../expenses'

type ApiData = {
  data?: Eitem[]
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
        'INSERT INTO eitems (ename, esymbol) VALUES (?, ?)',
        [parsedReq.ename.substring(0, 50), parsedReq.esymbol.substring(0, 7)],
        function (error, results, fields) {
          if (error) {
            res.status(500).json({ error: String(error) })
          } else {
            res.status(201).json({ data: results as Eitem[] })
          }
          resolve(null)
        }
      )
    } else if (req.method === 'GET') {
      connection.query(
        'SELECT * FROM eitems',
        function (error, results, fields) {
          if (error) {
            res.status(500).json({ error: String(error) })
          } else {
            res.status(200).json({ data: (results as Eitem[]) || [] })
          }
          resolve(null)
        }
      )
    }
  })
}
