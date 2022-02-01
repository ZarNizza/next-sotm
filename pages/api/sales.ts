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
  if (req.method === 'POST') {
    const parsedReq = JSON.parse(req.body)
    const dateNow = new Date()
    connection.query(
      'INSERT INTO sales (sdate, cust, prod, sum) VALUES (?, ?, ?, ?)',
      [
        dateNow,
        Number(parsedReq.customer),
        Number(parsedReq.prod),
        Number(parsedReq.sum)
      ],
      function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        }
        res.status(201).json({ data: results as Sale[] })
        return
      }
    )
  } else if (req.method === 'GET') {
    connection.query('SELECT * FROM sales', function (error, results, fields) {
      if (error) {
        res.status(500).json({ error: String(error) })
      }
      res.status(200).json({ data: (results as Sale[]) || [] })
      return
    })
  }
}
