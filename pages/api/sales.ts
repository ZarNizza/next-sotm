import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Sale } from '../plus'

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
    let sql: string = ''
    let params: string[] = []

    switch (req.method) {
      case 'GET':
        sql = 'SELECT * FROM sales'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)
        console.log('!!!!!!!!!!! POST, parsedReq=', parsedReq)
        switch (parsedReq.mode) {
          case 'edit':
            sql =
              'UPDATE sales SET sdate="' +
              parsedReq.sdate +
              '", cust="' +
              String(parsedReq.cust) +
              '", prod="' +
              String(parsedReq.prod) +
              '", sum="' +
              String(parsedReq.sum) +
              '" WHERE sid=' +
              parsedReq.sid
            break
          case 'new':
            const today = new Date()
            const m0 = Number(today.getMonth()) < 9 ? '0' : ''
            const d0 = Number(today.getDate()) < 9 ? '0' : ''
            const sqlDate = !!parsedReq.sdate
              ? parsedReq.sdate
              : String(today.getFullYear()) +
                '-' +
                m0 +
                String(today.getMonth() + 1) +
                '-' +
                d0 +
                String(today.getDate()) +
                'T' +
                timeZone +
                ':00:00'

            sql =
              'INSERT INTO sales (sdate, cust, prod, sum) VALUES (?, ?, ?, ?)'
            params = [
              sqlDate,
              String(parsedReq.cust),
              String(parsedReq.prod),
              String(parsedReq.sum)
            ]
            console.log('---------------------- new: ', sql, params)
            break
          case 'del':
            sql = 'UPDATE sales SET sdel = 1 WHERE sid=' + parsedReq.sid
            break
          case 'restore':
            sql = 'UPDATE sales SET sdel = 0 WHERE sid=' + parsedReq.sid
            break
          default:
            console.log('! S - bad POST body.mode api request')
        }
        break
      default:
        console.log('! S - bad body.MODE api request')
        break
    }
    if (sql > '') {
      console.log('=== sql OK === ', sql)
      connection.query(sql, params, function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        } else {
          res.status(201).json({ data: (results as Sale[]) || [] })
        }
        resolve(null)
      })
    } else {
      console.log('////////////// sql err, sql=', sql)
      res.status(500).json({ error: '!sales - sql-error: empty query' })
    }
  })
}
