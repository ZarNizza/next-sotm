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
    pool.getConnection(function (poolErr, connection) {
      if (poolErr) {
        resolve([])
      } else {
        connection.query(
          'SELECT * FROM prod',
          function (connError, results: Product[], fields) {
            connection.release()
            if (connError) {
              console.log('!!!api/stat - init Products:', connError)
              resolve([])
            } else {
              resolve(results)
            }
          }
        )
      }
    })
  })

  return new Promise((resolve, reject) => {
    //
    function poolGetConnection(sqlQuery: string, source: string) {
      pool.getConnection(function (err, connection) {
        if (err) {
          res.status(500).json({ error: String('DataBase not connected!') })
          resolve('! DB not connected !')
        } else {
          connection.query(sqlQuery, function (error, results, fields) {
            connection.release()
            if (error) {
              res.status(500).json({
                error: String('sql error (X3)')
              })
              console.log('api/sql: error:', error)
              reject(error)
            } else {
              console.log(
                'getConn status 201 - SQL:',
                sqlQuery,
                ' data:',
                results,
                ' source:',
                source
              )
              res.status(201).json({ data: results, source: source })
              resolve(results)
              return results
            }
          })
        }
      })
    }

    let sqlQuery = ''
    let source = ''
    let sqlProdSum = ''
    let currentCustomer = ''
    let currCustJoin = ''
    let connErrorText = ''
    //
    //
    const parsedReq = JSON.parse(req.body)
    if (typeof parsedReq.currentCustomer !== 'undefined') {
      if (parsedReq.currentCustomer[0] !== 0) {
        currentCustomer = ` AND c.cid = ${parsedReq.currentCustomer[0]} `
        currCustJoin = ' LEFT JOIN customers AS c ON c.cid = s.cust'
      }
    }

    let startDate = parsedReq.startDate
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

    if (startDate > finishDate) {
      //silent change
      const tmpDate = startDate
      startDate = finishDate
      finishDate = tmpDate
    }
    //
    //
    //
    if (req.method === 'POST') {
      switch (parsedReq.mode) {
        //
        case 'show_S':
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

          source = 'short'

          poolGetConnection(sqlQuery, source)

          break
        //
        case 'show_X':
          sqlQuery =
            'SELECT e.esymbol, SUM(CASE WHEN x.xitem = e.eid THEN x.xsum ELSE 0 END) AS Xgross FROM eitems AS e' +
            ' LEFT JOIN xpenses AS x ON x.xitem = e.eid' +
            currCustJoin +
            ' WHERE x.xdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            currentCustomer +
            ' GROUP BY e.esymbol WITH ROLLUP'

          source = 'short'

          poolGetConnection(sqlQuery, source)
          break
        //
        case 'show_SX':
          sqlQuery =
            'SELECT p.psymbol, SUM(CASE WHEN s.prod = p.pid THEN s.sum ELSE 0 END) AS gross FROM prod AS p' +
            ' LEFT JOIN sales AS s ON s.prod = p.pid' +
            currCustJoin +
            ' WHERE s.sdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            currentCustomer +
            ' GROUP BY p.psymbol WITH ROLLUP ' +
            'UNION ALL ' +
            'SELECT e.esymbol, SUM(CASE WHEN x.xitem = e.eid THEN x.xsum ELSE 0 END) AS Xgross FROM eitems AS e' +
            ' LEFT JOIN xpenses AS x ON x.xitem = e.eid' +
            currCustJoin +
            ' WHERE x.xdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            currentCustomer +
            ' GROUP BY e.esymbol WITH ROLLUP'

          source = 'short'

          poolGetConnection(sqlQuery, source)

          break
        //

        case 'show_SX_Full':
          res.status(500).json({
            error: String('sql COMING SOON!')
          })
          reject('sql COMING SOON!')
          break
        //
        //
        //
        case 'show_CS_Full':
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

          source = 'full'

          poolGetConnection(sqlQuery, source)

          break
        //

        //
        default:
          res.status(404).json({ error: '!api default case' })
          reject(null)
          break
      }
    }
  })
}
