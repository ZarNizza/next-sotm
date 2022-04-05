import type { NextApiRequest, NextApiResponse } from 'next'
import type { Sale } from '../plus'
import serialiseDate from '../../components/serialiseDate'

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
  console.error('X3 error on DB: ', err)
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
        sql = 'SELECT * FROM sales ORDER BY date DESC LIMIT 50'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)
        // console.log('!!!!!!!!!!! POST, parsedReq=', parsedReq)
        switch (parsedReq.mode) {
          case 'edit':
            sql =
              'UPDATE sales SET date=$1, cust=$2, prod=$3, sum=$4, sumd=$5 WHERE id=$6'
            params = [
              parsedReq.date,
              String(parsedReq.cust),
              String(parsedReq.prod),
              String(parsedReq.sum),
              String(parsedReq.sumd),
              Number(parsedReq.id)
            ]
            break
          case 'new':
            const sqlDate = serialiseDate(new Date(), '')
            // const today = serialiseDate(new Date())
            // const m0 = Number(today.getMonth()) < 9 ? '0' : ''
            // const d0 = Number(today.getDate()) < 9 ? '0' : ''
            // const sqlDate = !!parsedReq.date
            //   ? parsedReq.date
            //   : String(today.getFullYear()) +
            //     '-' +
            //     m0 +
            //     String(today.getMonth() + 1) +
            //     '-' +
            //     d0 +
            //     String(today.getDate()) +
            //     'T' +
            //     timeZone +
            //     ':00:00'

            sql =
              'INSERT INTO sales (date, cust, prod, sum, sumd) VALUES ($1, $2, $3, $4, $5)'
            params = [
              sqlDate,
              String(parsedReq.cust),
              String(parsedReq.prod),
              String(parsedReq.sum),
              String(parsedReq.sumd)
            ]
            console.log('--- new: ', sql, params)
            break
          case 'del':
            sql = 'UPDATE sales SET del = 1 WHERE id=' + parsedReq.id
            break
          case 'restore':
            sql = 'UPDATE sales SET del = 0 WHERE id=' + parsedReq.id
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
      // console.log('=== sql OK === ', sql)
      pool.connect().then((client: any) => {
        return client
          .query(sql, params)
          .then((results: any) => {
            res.status(200).json({ data: results.rows })
            client.release()
            // console.log(results.rows)
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
