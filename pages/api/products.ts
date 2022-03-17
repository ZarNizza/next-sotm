import type { NextApiRequest, NextApiResponse } from 'next'
import { Product } from '../plus'

type ApiData = {
  data?: Product[]
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
  return new Promise((resolve, reject) => {
    let sql: string = ''
    let params: string[] = []

    switch (req.method) {
      case 'GET':
        sql = 'SELECT * FROM prod ORDER BY psymbol'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)
        console.log('!!!!!!!!!!! POST, parsedReq=', parsedReq)
        switch (parsedReq.mode) {
          case 'edit':
            sql = 'UPDATE prod SET pname=$1, psymbol=$2 WHERE pid=$3'
            params = [
              parsedReq.pname.substring(0, 50),
              parsedReq.psymbol.substring(0, 7),
              parsedReq.pid
            ]
            break
          case 'new':
            sql = 'INSERT INTO prod (pname, psymbol) VALUES ($1, $2)'
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
      res.status(500).json({ error: '!prod - sql-error: empty query' })
    }
  })
}
