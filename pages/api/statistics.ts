import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Sale, Customer, Product } from '../add'
import { useState } from 'react'

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
  // init products
  const products = await new Promise<Product[]>((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err // not connected!
      connection.query(
        'SELECT * FROM prod',
        function (error, results: Product[], fields) {
          connection.release()
          if (error) {
            console.log('!api/stat - init Products - MySQL ERROR', error)
            reject(error)
            return
          } else {
            resolve(results)
          }
        }
      )
    })
  })

  return new Promise((resolve, reject) => {
    const parsedReq = JSON.parse(req.body)
    const startDate = parsedReq.startDate
      ? '"' + parsedReq.startDate + ' 00:00:00"'
      : '"2021-01-01 00:00:00"'
    const finishDate = parsedReq.finishDate
      ? '"' +
        parsedReq.finishDate.slice(0, parsedReq.finishDate.length - 2) +
        String(
          Number(parsedReq.finishDate.slice(parsedReq.finishDate.length - 2)) +
            1
        ) +
        ' 00:00:00"'
      : '"2099-12-31 00:00:00"'

    if (req.method === 'POST') {
      switch (parsedReq.mode) {
        //
        case 'show_Sales':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'SELECT * FROM sales',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res.status(500).json({
                    error: String('!api/sys2 showSales err:' + error)
                  })
                  console.log('api/sql: error code=', error.code)
                  console.log('api/sql: error fatal=', error.fatal)
                  reject(error)
                } else {
                  res.status(200).json({ data: results })
                  resolve(results)
                }
              }
            )
          })
          break
        //
        case 'show_Full':
          let sqlProdSum = ''
          // SELECT sales.prod, SUM(sales.sum) AS psum FROM sales WHERE sales.cust = customers.cid GROUP BY sales.prod
          sqlProdSum = products.reduce(
            (sum, item) =>
              sum +
              'SUM(CASE WHEN sales.cust = customers.cid AND sales.prod = ' +
              item.pid +
              ' THEN sales.sum ELSE 0 END) AS pSum' +
              String(item.pid) +
              ', ',
            ''
          )

          // console.log('+++++++ startDate = ', startDate)
          console.log('++++++ finishDate = ', finishDate)

          const sqlQuery =
            'SELECT customers.cid, customers.cname,' +
            sqlProdSum +
            ' SUM(sales.sum) AS gross FROM customers' +
            ' LEFT JOIN sales ON sales.cust = customers.cid' +
            ' WHERE sales.sdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ' GROUP BY customers.cid'

          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(sqlQuery, function (error, results, fields) {
              connection.release()
              if (error) {
                res.status(500).json({
                  error: String('!api/sys2 showFULL err:' + error)
                })
                console.log('api/sql: error code=', error.code)
                console.log('api/sql: error fatal=', error.fatal)
                reject(error)
              } else {
                res.status(200).json({ data: results })
                resolve(results)
              }
            })
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
