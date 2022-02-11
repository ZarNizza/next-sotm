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
          } else {
            resolve(results)
          }
        }
      )
    })
  })

  return new Promise((resolve, reject) => {
    const parsedReq = JSON.parse(req.body)
    const currentCustomer =
      parsedReq.currentCustomer[0] === 0
        ? ''
        : ` AND c.cid = ${parsedReq.currentCustomer[0]} `
    const currCustJoin =
      parsedReq.currentCustomer[0] === 0
        ? ''
        : ' LEFT JOIN customers AS c ON c.cid = s.cust'

    const startDate = parsedReq.startDate
      ? '"' + parsedReq.startDate + ' 00:00:00"'
      : '"2020-01-01 00:00:00"'
    let finishDate = '"2099-12-31 00:00:00"'

    if (parsedReq.finishDate) {
      const fDate = new Date(parsedReq.finishDate)
      fDate.setDate(fDate.getDate() + 1)
      let finDate = String(fDate.getFullYear()) + '-'
      if (fDate.getMonth() < 9) finDate += '0'
      finDate += String(fDate.getMonth() + 1) + '-'
      if (fDate.getDate() < 10) finDate += '0'
      finDate += String(fDate.getDate())
      finishDate = '"' + finDate + ' 00:00:00"'
    }

    let sqlQuery = ''

    if (req.method === 'POST') {
      switch (parsedReq.mode) {
        //
        case 'show_Sales':
          sqlQuery =
            'SELECT p.psymbol, SUM(CASE WHEN s.prod = p.pid THEN s.sum ELSE 0 END) AS gross FROM prod AS p' +
            ' LEFT JOIN sales AS s ON s.prod = p.pid' +
            currCustJoin +
            ' WHERE s.sdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            currentCustomer +
            ' GROUP BY p.psymbol WITH ROLLUP'

          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(sqlQuery, function (error, results, fields) {
              connection.release()
              if (error) {
                res.status(500).json({
                  error: String('!api/sys2 showSales err:' + error)
                })
                console.log('api/sql: error code=', error.code)
                console.log('api/sql: error fatal=', error.fatal)
                reject(error)
              } else {
                res.status(201).json({ data: results, source: 'short' })
                resolve(results)
              }
            })
          })
          break
        //
        case 'show_Full':
          let sqlProdSum = ''
          sqlProdSum = products.reduce(
            (sum, item) =>
              sum +
              'SUM(CASE WHEN s.cust = c.cid AND s.prod = ' +
              item.pid +
              ' THEN s.sum ELSE 0 END) AS pSum' +
              String(item.pid) +
              ', ',
            ''
          )
          sqlQuery =
            'SELECT c.cname,' +
            sqlProdSum +
            ' SUM(s.sum) AS gross FROM customers AS c' +
            ' LEFT JOIN sales AS s ON s.cust = c.cid' +
            ' WHERE s.sdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            currentCustomer +
            ' GROUP BY c.cname WITH ROLLUP'

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
                res.status(202).json({ data: results, source: 'full' })
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
