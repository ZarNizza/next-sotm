import type { NextApiRequest, NextApiResponse } from 'next'
import type { Eitem } from '../minus'

type ApiData = {
  data?: Eitem[]
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
        sql = 'SELECT * FROM eitems ORDER BY symbol'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)
        console.log('!!!!!!!!!!! POST, parsedReq=', parsedReq)
        switch (parsedReq.mode) {
          case 'edit':
            sql =
              "UPDATE eitems SET name='" +
              parsedReq.name.substring(0, 50) +
              "', symbol='" +
              parsedReq.symbol.substring(0, 7) +
              "' WHERE id=" +
              parsedReq.id
            break
          case 'new':
            sql = 'INSERT INTO eitems (name, symbol) VALUES ($1, $2)'
            params = [
              parsedReq.name.substring(0, 50),
              parsedReq.symbol.substring(0, 7)
            ]
            console.log('---------------------- new: ', sql, params)
            break
          case 'del':
            sql = 'UPDATE eitems SET del = 1 WHERE id=' + parsedReq.id
            break
          case 'restore':
            sql = 'UPDATE eitems SET del = 0 WHERE id=' + parsedReq.id
            break
          default:
            console.log('! Eitems - bad POST body.mode api request')
        }
        break
      default:
        console.log('! Eitems - bad body.MODE api request')
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
      res.status(500).json({ error: '!eitems - sql-error: empty query' })
    }
  })
}
