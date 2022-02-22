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
    let sql: string = ''
    let params: string[] = []

    switch (req.method) {
      case 'GET':
        sql = 'SELECT * FROM customers'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)

        switch (parsedReq.mode) {
          case 'edit':
            sql =
              'UPDATE customers SET cname="' +
              parsedReq.cname.substring(0, 50) +
              '", cphone="' +
              parsedReq.cphone.substring(0, 20) +
              '", gooid="' +
              parsedReq.gooid.substring(0, 20) +
              '" WHERE cid=' +
              parsedReq.cid
            break
          case 'new':
            sql = 'INSERT INTO customers (cname, cphone) VALUES (?, ?)'
            params = [
              parsedReq.cname.substring(0, 50),
              parsedReq.cphone.substring(0, 20)
            ]
            break
          case 'del':
            sql = 'UPDATE customers SET cdel = 1 WHERE cid=' + parsedReq.cid
            break
          case 'restore':
            sql = 'UPDATE customers SET cdel = 0 WHERE cid=' + parsedReq.cid
            break
          default:
            console.log('! cust - bad POST body.mode api request')
        }
        break
      default:
        console.log('! cust - bad body.MODE api request')
        break
    }
    if (sql > '') {
      connection.query(sql, params, function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        } else {
          res.status(201).json({ data: (results as Customer[]) || [] })
        }
        resolve(null)
      })
    } else {
      res.status(500).json({ error: '!customers - sql-error: empty query' })
    }
  })
}
