import type { NextApiRequest, NextApiResponse } from 'next'
import type { User } from '../editUsers'

type ApiData = {
  data?: User[]
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
  return new Promise((resolve, reject) => {
    let sql: string = ''
    let params: string[] = []

    switch (req.method) {
      case 'POST':
        const parsedReq = JSON.parse(req.body)
        switch (parsedReq.mode) {
          case 'get':
            sql = 'SELECT * FROM users'
            break
          case 'edit':
            sql =
              'UPDATE users SET md5=$1, name=$2, phone=$3, gooid=$4 WHERE id=$5'
            params = [
              parsedReq.md5.substring(0, 32),
              parsedReq.name.substring(0, 50),
              parsedReq.phone.substring(0, 20),
              String(parsedReq.gooid).substring(0, 20),
              parsedReq.id
            ]
            break
          case 'new':
            sql = 'INSERT INTO users (md5, name, phone) VALUES ($1, $2, $3)'
            params = [
              parsedReq.md5.substring(0, 32),
              parsedReq.name.substring(0, 50),
              parsedReq.phone.substring(0, 20)
            ]
            console.log('--- new: ', sql, params)
            break
          case 'del':
            sql = 'UPDATE users SET del = 1 WHERE id=' + parsedReq.id
            break
          case 'restore':
            sql = 'UPDATE users SET del = 0 WHERE id=' + parsedReq.id
            break
          default:
            console.log('! U - bad POST body.mode api request')
        }
        break
      default:
        console.log('! U - bad body.MODE api request')
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
      res.status(500).json({ error: '!users - sql-error: empty query' })
    }
  })
}
