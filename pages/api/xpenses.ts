import type { NextApiRequest, NextApiResponse } from 'next'
import type { Xpense } from '../minus'

type ApiData = {
  data?: Xpense[]
  error?: string
}

const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.PG_URI,
  ssl: {
    rejectUnauthorized: false
  }
})
pool.on('error', (err: any, client: any) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
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
      pool.connect().then((client: any) => {
        return client
          .query(sql, params)
          .then((results: any) => {
            res.status(200).json({ data: results.rows })
            client.release()
            console.log(results.rows)
            resolve(null)
          })
          .catch((err: any) => {
            res.status(500).json({
              error: String(err)
            })
            client.release()
            console.log(err.stack)
            resolve(null)
          })
      }) //
    } else {
      console.log('////////////// sql err, sql=', sql)
      res.status(500).json({ error: '!xpenses - sql-error: empty query' })
    }
  })
}
