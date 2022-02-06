import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Sale, Customer, Product } from '../add'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  //
  //
  //
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      switch (req.body) {
        //
        case 'show_Sales':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'SELECT * FROM sales',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api/sys2 showSales err:' + error) })
                  console.log('api/sql: error code=', error.code)
                  console.log('api/sql: error fatal=', error.fatal)
                  reject(error)
                } else {
                  res.status(200).json({ data: results })
                  resolve(null)
                }
              }
            )
          })
          break
        //
        case 'show_Full':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'SELECT * FROM sales',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api/sys2 showFULL err:' + error) })
                  console.log('api/sql: error code=', error.code)
                  console.log('api/sql: error fatal=', error.fatal)
                  reject(error)
                } else {
                  res.status(200).json({ data: results })
                  resolve(null)
                }
              }
            )
          })
          break
        //
        default:
          res.status(404).json({ data: '!api default case' })
          resolve(null)
          break
      }
    }
  })
}
