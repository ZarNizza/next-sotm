import type { NextApiRequest, NextApiResponse } from 'next'
import type { Sale } from '../plus'

type ApiData = {
  data?: Sale[]
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
        sql = 'SELECT * FROM sales'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)
        console.log('!!!!!!!!!!! POST, parsedReq=', parsedReq)
        switch (parsedReq.mode) {
          case 'edit':
            sql =
              'UPDATE sales SET sdate=$1, cust=$2, prod=$3, sum=$4 WHERE sid=$5'
            params = [
              parsedReq.sdate,
              String(parsedReq.cust),
              String(parsedReq.prod),
              String(parsedReq.sum),
              parsedReq.sid
            ]
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
              'INSERT INTO sales (sdate, cust, prod, sum) VALUES ($1, $2, $3, $4)'
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
      res.status(500).json({ error: '!sales - sql-error: empty query' })
    }
  })
}
