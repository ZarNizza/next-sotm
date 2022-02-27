// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { User } from '../editUsers'

type ApiData = {
  data?: User[]
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
        sql = 'SELECT * FROM users'
        break

      case 'POST':
        const parsedReq = JSON.parse(req.body)
        console.log('!!!!!!!!!!! POST, parsedReq=', parsedReq)
        switch (parsedReq.mode) {
          case 'edit':
            sql =
              'UPDATE users SET uname="' +
              parsedReq.uname.substring(0, 50) +
              '", uphone="' +
              parsedReq.uphone.substring(0, 20) +
              '", gooid="' +
              String(parsedReq.gooid).substring(0, 20) +
              '", timezone="' +
              String(parsedReq.timezone).substring(0, 3) +
              '" WHERE uid=' +
              parsedReq.uid
            break
          case 'new':
            sql = 'INSERT INTO users (uname, uphone, timezone) VALUES (?, ?, ?)'
            params = [
              parsedReq.uname.substring(0, 50),
              parsedReq.uphone.substring(0, 20),
              parsedReq.timezone.substring(0, 3)
            ]
            console.log('---------------------- new: ', sql, params)
            break
          case 'del':
            sql = 'UPDATE users SET udel = 1 WHERE uid=' + parsedReq.uid
            break
          case 'restore':
            sql = 'UPDATE users SET udel = 0 WHERE uid=' + parsedReq.uid
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
      connection.query(sql, params, function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) })
        } else {
          res.status(201).json({ data: (results as User[]) || [] })
        }
        resolve(null)
      })
    } else {
      console.log('////////////// sql err, sql=', sql)
      res.status(500).json({ error: '!users - sql-error: empty query' })
    }
  })
}
