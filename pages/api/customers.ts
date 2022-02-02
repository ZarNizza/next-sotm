// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Customer } from '../add'

type ApiData = {
  data?: Customer[]
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
    connection.query(
      'INSERT INTO customers (cname, cphone) VALUES (?, ?)',
      [parsedReq.cname.substring(0, 50), parsedReq.cphone.substring(0, 20)],
      function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        }
        res.status(201).json({ data: results as Customer[] })
        return
      }
    )
  } else if (req.method === 'GET') {
    connection.query(
      'SELECT * FROM customers',
      function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        }
        res.status(200).json({ data: (results as Customer[]) || [] })
        return
      }
    )
  }
}