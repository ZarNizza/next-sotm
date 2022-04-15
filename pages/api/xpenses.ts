import type { NextApiRequest, NextApiResponse } from 'next'
import type { Xpense } from '../minus'
import serialiseDate from '../../components/serialiseDate'

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
  console.error('X3 error on DB: ', err)
  process.exit(-1)
})

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiData>
) {
  //
  return new Promise((resolve, reject) => {
    let sql: string = ''
    let params: string[] = []

    switch (req.method) {
      case 'POST':
        const parsedReq = JSON.parse(req.body)
        const dbPrefix = parsedReq.dbPrefix
        switch (parsedReq.mode) {
          case 'get':
            sql =
              'SELECT * FROM ' +
              dbPrefix +
              'xpenses ORDER BY date DESC LIMIT 50'
            break
          case 'edit':
            sql =
              'UPDATE ' +
              dbPrefix +
              'xpenses SET date=$1, xitem=$2, sum=$3, num=$4 WHERE id=$5'
            params = [
              parsedReq.date,
              String(parsedReq.xitem),
              String(parsedReq.sum),
              String(parsedReq.num),
              parsedReq.id
            ]
            break
          case 'new':
            const sqlDate = serialiseDate(new Date())

            sql =
              'INSERT INTO ' +
              dbPrefix +
              'xpenses (date, xitem, sum, num) VALUES ($1, $2, $3, $4)'
            params = [
              sqlDate,
              String(parsedReq.xitem),
              String(parsedReq.sum),
              String(parsedReq.num)
            ]
            console.log('--- new: ', sql, ', ', params)
            break
          case 'del':
            sql =
              'UPDATE ' +
              dbPrefix +
              'xpenses SET del = 1 WHERE id=' +
              parsedReq.id
            break
          case 'restore':
            sql =
              'UPDATE ' +
              dbPrefix +
              'xpenses SET del = 0 WHERE id=' +
              parsedReq.id
            break
          default:
            console.log('! X - bad POST body.mode api request')
        }
        break
      default:
        console.log('! X - default.MODE api request')
        break
    }
    //
    if (sql > '') {
      console.log('=== sql OK === ', sql)
      pool.connect().then((client: any) => {
        return client
          .query(sql, params)
          .then((results: any) => {
            res.status(200).json({ data: results.rows })
            client.release()
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
      })
      //
    } else {
      console.log('////////////// sql err, sql=', sql)
      res.status(500).json({ error: '!xpenses - sql-error: empty query' })
    }
  })
}
