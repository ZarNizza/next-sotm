import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import { Product } from '../plus'

type ApiData = {
  data?: Product[]
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
        sql = 'SELECT * FROM prod'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)
        console.log('!!!!!!!!!!! POST, parsedReq=', parsedReq)
        switch (parsedReq.mode) {
          case 'edit':
            sql =
              'UPDATE prod SET pname="' +
              parsedReq.pname.substring(0, 50) +
              '", psymbol="' +
              parsedReq.psymbol.substring(0, 7) +
              '" WHERE pid=' +
              parsedReq.pid
            break
          case 'new':
            sql = 'INSERT INTO prod (pname, psymbol) VALUES (?, ?)'
            params = [
              parsedReq.pname.substring(0, 50),
              parsedReq.psymbol.substring(0, 7)
            ]
            console.log('---------------------- new: ', sql, params)
            break
          case 'del':
            sql = 'UPDATE prod SET pdel = 1 WHERE pid=' + parsedReq.pid
            break
          case 'restore':
            sql = 'UPDATE prod SET pdel = 0 WHERE pid=' + parsedReq.pid
            break
          default:
            console.log('! Prod - bad POST body.mode api request')
        }
        break
      default:
        console.log('! Prod - bad body.MODE api request')
        break
    }
    if (sql > '') {
      console.log('=== sql OK === ', sql)
      connection.query(sql, params, function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        } else {
          res.status(201).json({ data: (results as Product[]) || [] })
        }
        resolve(null)
      })
    } else {
      console.log('////////////// sql err, sql=', sql)
      res.status(500).json({ error: '!prod - sql-error: empty query' })
    }
  })
}
