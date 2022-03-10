import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'

const { Client } = require('pg')
const client = new Client({
  connectionString: process.env.PG_URI,
  ssl: {
    rejectUnauthorized: false
  }
})
client.connect()

// const pool = mysql.createPool({
//   connectionLimit: 10,
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// })

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      const parsedReq = JSON.parse(req.body)
      switch (parsedReq.mode) {
        case 'sql':
          client.query(parsedReq.sqlString, [], (err: any, results: any) => {
            if (err) {
              res.status(500).json({
                error: String(err)
              })
              resolve('! DB not connected !')
            } else {
              res.status(202).json({ data: results })
              resolve(null)
            }
            console.log(err ? err.stack : results) // .rows[0].message

            // client.end()
          })
          // pool.getConnection(function (err, connection) {
          //   if (err) {
          //     res.status(500).json({ error: String('DataBase not connected!') })
          //     resolve('! DB not connected !')
          //   } else {
          //     connection.query(
          //       parsedReq.sqlString,
          //       function (error, results, fields) {
          //         if (error) {
          //           res.status(500).json({ error: String(error) })
          //           reject(error)
          //         } else {
          //           res.status(202).json({ data: results })
          //           resolve(null)
          //         }
          //       }
          //     )
          //   }
          // })
          break
        default:
          res.status(404).json({ data: '!api default case' })
          resolve(null)
          break
      }
    }
  })
}
