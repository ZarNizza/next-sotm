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
            sql = 'SELECT * FROM ' + dbPrefix + 'eitems ORDER BY symbol'
            break
          case 'edit':
            sql =
              'UPDATE ' +
              dbPrefix +
              "eitems SET name='" +
              parsedReq.name.substring(0, 50) +
              "', symbol='" +
              parsedReq.symbol.substring(0, 7) +
              "', price='" +
              parsedReq.price +
              "' WHERE id=" +
              parsedReq.id
            break
          case 'new':
            sql =
              'INSERT INTO ' +
              dbPrefix +
              'eitems (name, symbol, price) VALUES ($1, $2, $3)'
            params = [
              parsedReq.name.substring(0, 50),
              parsedReq.symbol.substring(0, 7),
              parsedReq.price
            ]
            console.log('--- new: ', sql, params)
            break
          case 'del':
            sql =
              'UPDATE ' +
              dbPrefix +
              'eitems SET del = 1 WHERE id=' +
              parsedReq.id
            break
          case 'restore':
            sql =
              'UPDATE ' +
              dbPrefix +
              'eitems SET del = 0 WHERE id=' +
              parsedReq.id
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
      }) //
    } else {
      console.log('////////////// sql err, sql=', sql)
      res.status(500).json({ error: '!eitems - sql-error: empty query' })
    }
  })
}
