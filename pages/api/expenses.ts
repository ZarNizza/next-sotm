import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Xpense } from '../minus'

type ApiData = {
  data?: Xpense[]
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
        sql = 'SELECT * FROM xpenses'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)
        console.log('!!!!!!!!!!! POST, parsedReq=', parsedReq)
        switch (parsedReq.mode) {
          case 'edit':
            sql =
              'UPDATE xpenses SET xdate="' +
              parsedReq.xdate +
              '", xitem="' +
              String(parsedReq.xitem) +
              '", xsum="' +
              String(parsedReq.xsum) +
              '" WHERE xid=' +
              parsedReq.xid
            break
          case 'new':
            const today = new Date()
            const m0 = Number(today.getMonth()) < 9 ? '0' : ''
            const d0 = Number(today.getDate()) < 9 ? '0' : ''
            const sqlDate = !!parsedReq.xdate
              ? parsedReq.xdate
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

            sql = 'INSERT INTO xpenses (xdate, xitem, xsum) VALUES (?, ?, ?)'
            params = [sqlDate, String(parsedReq.xitem), String(parsedReq.xsum)]
            console.log('---------------------- new: ', sql, params)
            break
          case 'del':
            sql = 'UPDATE xpenses SET xdel = 1 WHERE xid=' + parsedReq.xid
            break
          case 'restore':
            sql = 'UPDATE xpenses SET xdel = 0 WHERE xid=' + parsedReq.xid
            break
          default:
            console.log('! X - bad POST body.mode api request')
        }
        break
      default:
        console.log('! X - bad body.MODE api request')
        break
    }
    if (sql > '') {
      console.log('=== sql OK === ', sql)
      connection.query(sql, params, function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        } else {
          res.status(201).json({ data: (results as Xpense[]) || [] })
        }
        resolve(null)
      })
    } else {
      console.log('////////////// sql err, sql=', sql)
      res.status(500).json({ error: '!xpenses - sql-error: empty query' })
    }
  })
}
