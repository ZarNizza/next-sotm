import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Product } from '../add'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

export default async function sysHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(
    '--------------------------------- start 1back --------------------------'
  )
  // init products
  const products = await new Promise<Product[]>((resolve, reject) => {
    pool.getConnection(function (poolErr, connection) {
      if (poolErr) {
        resolve([])
      } else {
        // not connected!
        connection.query(
          'SELECT * FROM prod',
          function (connError, results: Product[], fields) {
            connection.release()
            if (connError) {
              console.log('!1back - init - error= ', connError)
              resolve([])
            } else {
              resolve(results)
            }
          }
        )
      }
    })
  })
  console.log('1back --- initProd:', products)

  return new Promise((pResolve, pRej) => {
    const parsedReq = JSON.parse(req.body)

    if (req.method === 'POST') {
      switch (parsedReq.mode) {
        //
        case 'show_S':
          pool.getConnection(function (err, connection) {
            if (err) {
              res.status(500).json({ error: 'DB not connected' })
            } else {
              // not connected!
              connection.query(
                'select * from xpenses',
                function (error, results, fields) {
                  connection.release()
                  if (error) {
                    res.status(500).json({
                      error: String(
                        '!1back - S - funcError - res500.error= ' + error
                      )
                    })
                    console.log(
                      '!1back - SX - funcError - res500.error.code= ',
                      error.code
                    )
                    console.log(
                      '!1back - SX - funcError - res500.error.fatal= ',
                      error.fatal
                    )
                    pRej(error)
                  } else {
                    res.status(201).json({ data: results, source: 'short' })
                    pResolve(results)
                  }
                }
              )
            }
          })
          break
        //

        case 'show_SX':
          pool.getConnection(function (poolErr, connection) {
            if (poolErr) {
              res.status(501).json({
                error: String(
                  '!1back - SX - funcError - res501.error= ' + poolErr
                )
              })
              console.log(
                '!1back - SX - funcError - res500.connError= ',
                poolErr
              )
              pResolve(
                '************ resolve with connection error *****************'
              )
            } else {
              // not connected!
              connection.query(
                'select * from xpenses',
                function (connError, connResults, fields) {
                  connection.release()
                  if (connError) {
                    res.status(500).json({
                      error: String(
                        '!1back - SX - funcError - res500.error= ' + connError
                      )
                    })
                    console.log(
                      '!1back - SX - funcError - res500.connError= ',
                      connError
                    )
                    pRej('!reject mySXerr!')
                  } else {
                    res.status(201).json({ data: connResults, source: 'short' })
                    pResolve(null)
                  }
                }
              )
            }
          })
          break
        //

        //
        default:
          res.status(404).json({ data: '!1back - default case' })
          pRej('!reject default')
          pResolve('! resolve default')
          break
      }
    }
  })
}
