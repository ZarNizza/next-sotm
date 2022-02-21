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
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      const parsedReq = JSON.parse(req.body)
      let sql: string = ''
      let params: string[] = []

      switch (parsedReq.mode) {
        case 'edit':
          sql = 'UPDATE customers SET cname=?, cphone=?, gooid=? WHERE cid=?'
          params = [
            parsedReq.cname.substring(0, 50),
            parsedReq.cphone.substring(0, 20),
            parsedReq.gooid.substring(0, 20),
            parsedReq.cid
          ]
          break
        case 'insert':
          sql = 'INSERT INTO customers (cname, cphone) VALUES (?, ?)'
          params = [
            parsedReq.cname.substring(0, 50),
            parsedReq.cphone.substring(0, 20)
          ]
          break
        default:
          console.log('! cust - bad body.MODE api request')
          sql = 'INSERT INTO customers (cname, cphone) VALUES (?, ?)'
          params = [
            parsedReq.cname.substring(0, 50),
            parsedReq.cphone.substring(0, 20)
          ]
      }

      connection.query(sql, params, function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        } else {
          res.status(201).json({ data: results as Customer[] })
        }
        resolve(null)
      })
    } else if (req.method === 'GET') {
      connection.query(
        'SELECT * FROM customers',
        function (error, results, fields) {
          if (error) {
            res.status(500).json({ error: String(error) })
          } else {
            res.status(200).json({ data: (results as Customer[]) || [] })
          }
          resolve(null)
        }
      )
    }
  })
}
