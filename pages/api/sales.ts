import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Sale } from '../add'

type ApiData = {
  data?: Sale[]
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
  const timeZone = '04'

  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      const parsedReq = JSON.parse(req.body)
      const today = new Date()
      connection.query(
        'INSERT INTO sales (sdate, cust, prod, sum) VALUES (?, ?, ?, ?)',
        [
          String(today.getFullYear()) +
            '-' +
            String(today.getMonth() + 1) +
            '-' +
            String(today.getDate()) +
            'T' +
            timeZone +
            ':00:00',
          Number(parsedReq.customer),
          Number(parsedReq.prod),
          Number(parsedReq.sum)
        ],
        function (error, results, fields) {
          if (error) {
            res.status(500).json({ error: String(error) })
          } else {
            res.status(201).json({ data: results as Sale[] })
          }
          resolve(null)
        }
      )
    } else if (req.method === 'GET') {
      connection.query(
        'SELECT * FROM sales',
        function (error, results, fields) {
          if (error) {
            res.status(500).json({ error: String(error) })
          } else {
            res.status(200).json({ data: (results as Sale[]) || [] })
          }
          resolve(null)
        }
      )
    }
  })
}
