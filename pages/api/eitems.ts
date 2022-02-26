import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Eitem } from '../minus'

type ApiData = {
  data?: Eitem[]
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
  return new Promise((resolve, reject) => {
    let sql: string = ''
    let params: string[] = []

    switch (req.method) {
      case 'GET':
        sql = 'SELECT * FROM eitems'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)
        console.log('!!!!!!!!!!! POST, parsedReq=', parsedReq)
        switch (parsedReq.mode) {
          case 'edit':
            sql =
              'UPDATE eitems SET ename="' +
              parsedReq.ename.substring(0, 50) +
              '", esymbol="' +
              parsedReq.esymbol.substring(0, 7) +
              '" WHERE eid=' +
              parsedReq.eid
            break
          case 'new':
            sql = 'INSERT INTO eitems (ename, esymbol) VALUES (?, ?)'
            params = [
              parsedReq.ename.substring(0, 50),
              parsedReq.esymbol.substring(0, 7)
            ]
            console.log('---------------------- new: ', sql, params)
            break
          case 'del':
            sql = 'UPDATE eitems SET edel = 1 WHERE eid=' + parsedReq.eid
            break
          case 'restore':
            sql = 'UPDATE eitems SET edel = 0 WHERE eid=' + parsedReq.eid
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
      connection.query(sql, params, function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        } else {
          res.status(201).json({ data: (results as Eitem[]) || [] })
        }
        resolve(null)
      })
    } else {
      console.log('////////////// sql err, sql=', sql)
      res.status(500).json({ error: '!eitems - sql-error: empty query' })
    }
  })
}
