import type { NextApiRequest, NextApiResponse } from 'next'
import serialiseDate from '../../components/serialiseDate'
import type { Product } from '../plus'

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

const timeZone = '04'

export default async function sysHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve, reject) => {
    // common function
    function poolGetConnection(sqlQuery: string, source: string) {
      pool.connect().then((client: any) => {
        return client
          .query(sqlQuery, [])
          .then((results: any) => {
            client.release()
            res.status(201).json({ data: results.rows, source: source })
            resolve(results)
            return results
          })
          .catch((err: any) => {
            client.release()
            res.status(500).json({
              error: String('sql error (X3)')
            })
            console.log('Promise ERROR: ', err.stack)
            reject(err)
          })
      }) //
    }

    let sqlQuery = ''
    let source = ''
    let sqlProdSum = ''
    let sqlDPSum = ''
    let sqlDXSum = ''
    let currentCustomer = ''
    let currCustJoin = ''
    //
    //
    const parsedReq = JSON.parse(req.body)

    if (typeof parsedReq.currentCustomer !== 'undefined') {
      if (parsedReq.currentCustomer.id !== 0) {
        currentCustomer = ` AND (c.id = ${parsedReq.currentCustomer.id}) AND (c.del = 0) `
        currCustJoin = ' LEFT JOIN customers AS c ON c.id = s.cust'
      }
    }

    let startDate = parsedReq.startDate
      ? "'" + parsedReq.startDate + "'"
      : "'2020-01-01 00:00:00'"
    let finishDate = parsedReq.finishDate
      ? "'" + parsedReq.finishDate + "'"
      : "'2099-12-31 23:59:59'"

    if (startDate > finishDate) {
      //silent Dates swap
      const tmpDate = startDate
      startDate = finishDate
      finishDate = tmpDate
    }

    let iDate = new Date(startDate.slice(1, 11))
    const findate = new Date(finishDate.slice(1, 11))
    let dates: string[] = []

    for (; iDate < findate; iDate.setDate(iDate.getDate() + 1)) {
      dates.push(serialiseDate(iDate, timeZone).slice(0, 10))
    }

    //
    //
    //
    if (req.method === 'POST') {
      switch (parsedReq.mode) {
        //
        case 'get_stat':
          sqlQuery =
            'SELECT (SUM(s.sum) + SUM(s.sumd)) AS summa FROM sales AS s ' +
            ' WHERE (s.del = 0) AND (s.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') '

          source = 'short'

          poolGetConnection(sqlQuery, source)

          break
        //
        case 'show_S':
          sqlQuery =
            "SELECT (p.symbol || ' = ' || p.name) AS name, SUM(CASE WHEN s.prod = p.id THEN (s.sum + s.sumd) ELSE 0 END) AS gross FROM prod AS p " +
            ' LEFT JOIN sales AS s ON s.prod = p.id' +
            currCustJoin +
            ' WHERE (p.del = 0) AND (s.del = 0) AND (s.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            " GROUP BY ROLLUP (p.symbol || ' = ' || p.name) ORDER BY (p.symbol || ' = ' || p.name)"

          source = 'short'

          poolGetConnection(sqlQuery, source)

          break
        //
        case 'show_X':
          sqlQuery =
            "SELECT (e.symbol || ' = ' || e.name) AS name, SUM(CASE WHEN x.xitem = e.id THEN x.sum ELSE 0 END) AS Xgross FROM eitems AS e" +
            ' LEFT JOIN xpenses AS x ON x.xitem = e.id' +
            ' WHERE (e.del = 0) AND (x.del = 0) AND (x.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            " GROUP BY ROLLUP (e.symbol || ' = ' || e.name) ORDER BY (e.symbol || ' = ' || e.name)"

          source = 'short'

          poolGetConnection(sqlQuery, source)
          break
        //
        case 'show_SX':
          sqlQuery =
            "(SELECT (p.symbol || ' = ' || p.name) AS name, SUM(CASE WHEN s.prod = p.id THEN (s.sum + s.sumd) ELSE 0 END) AS gross FROM prod AS p" +
            ' LEFT JOIN sales AS s ON s.prod = p.id' +
            currCustJoin +
            ' WHERE (p.del = 0) AND (s.del = 0) AND (s.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            " GROUP BY ROLLUP (p.symbol || ' = ' || p.name) ORDER BY (p.symbol || ' = ' || p.name)) " +
            'UNION ALL ' +
            "(SELECT (e.symbol || ' = ' || e.name), SUM(CASE WHEN x.xitem = e.id THEN x.sum ELSE 0 END) AS Xgross FROM eitems AS e" +
            ' LEFT JOIN xpenses AS x ON x.xitem = e.id' +
            ' WHERE (e.del = 0) AND (x.del = 0) AND (x.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ')' +
            "GROUP BY ROLLUP (e.symbol || ' = ' || e.name) ORDER BY (e.symbol || ' = ' || e.name))"

          source = 'short'

          poolGetConnection(sqlQuery, source)

          break
        //
        case 'show_S_Full':
          sqlDPSum = dates.reduce(
            (sum, item, i) =>
              sum +
              "SUM(CASE WHEN DATE(s.date) = '" +
              item +
              "' AND s.prod = p.id " +
              ' THEN (s.sum + s.sumd) ELSE 0 END) AS "' +
              item.slice(5) +
              '", ',
            ''
          )

          sqlQuery =
            "SELECT (p.symbol || ' = ' || p.name) AS name, " +
            sqlDPSum +
            ' SUM(CASE WHEN s.prod = p.id THEN (s.sum + s.sumd) ELSE 0 END) AS sum FROM prod AS p' +
            ' LEFT JOIN sales AS s ON s.prod = p.id' +
            currCustJoin +
            ' WHERE (p.del = 0) AND (s.del = 0) AND (s.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            " GROUP BY ROLLUP (p.symbol || ' = ' || p.name) ORDER BY (p.symbol || ' = ' || p.name)"

          source = 'fullSD'

          poolGetConnection(sqlQuery, source)
          break
        //
        case 'show_X_Full':
          sqlDPSum = dates.reduce(
            (sum, item, i) =>
              sum +
              "SUM(CASE WHEN DATE(x.date) = '" +
              item +
              "' AND x.xitem = e.id " +
              ' THEN x.sum ELSE 0 END) AS "' +
              item.slice(5) +
              '", ',
            ''
          )

          sqlQuery =
            "SELECT (e.symbol || ' = ' || e.name) AS name, " +
            sqlDPSum +
            ' SUM(CASE WHEN x.xitem = e.id THEN x.sum ELSE 0 END) AS sum FROM eitems AS e' +
            ' LEFT JOIN xpenses AS x ON x.xitem = e.id' +
            currCustJoin +
            ' WHERE (e.del = 0) AND (x.del = 0) AND (x.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            " GROUP BY ROLLUP (e.symbol || ' = ' || e.name) ORDER BY (e.symbol || ' = ' || e.name)"

          source = 'fullSD'

          poolGetConnection(sqlQuery, source)
          break
        //
        //
        case 'show_SX_Full':
          sqlDPSum = dates.reduce(
            (sum, item, i) =>
              sum +
              "SUM(CASE WHEN DATE(s.date) = '" +
              item +
              "' AND s.prod = p.id " +
              ' THEN (s.sum + s.sumd) ELSE 0 END) AS "' +
              item.slice(5) +
              '", ',
            ''
          )
          sqlDXSum = dates.reduce(
            (sum, item, i) =>
              sum +
              "SUM(CASE WHEN DATE(x.date) = '" +
              item +
              "' AND x.xitem = e.id " +
              ' THEN x.sum ELSE 0 END) AS "' +
              item.slice(5) +
              '", ',
            ''
          )

          sqlQuery =
            "(SELECT (p.symbol || ' = ' || p.name) AS name, " +
            sqlDPSum +
            ' SUM(CASE WHEN s.prod = p.id THEN (s.sum + s.sumd) ELSE 0 END) AS sum FROM prod AS p' +
            ' LEFT JOIN sales AS s ON s.prod = p.id' +
            currCustJoin +
            ' WHERE (p.del = 0) AND (s.del = 0) AND (s.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            " GROUP BY ROLLUP (p.symbol || ' = ' || p.name) ORDER BY (p.symbol || ' = ' || p.name))" +
            ' UNION ALL ' +
            "(SELECT (e.symbol || ' = ' || e.name) AS name," +
            sqlDXSum +
            ' SUM(CASE WHEN x.xitem = e.id THEN x.sum ELSE 0 END) AS Xgross FROM eitems AS e' +
            ' LEFT JOIN xpenses AS x ON x.xitem = e.id' +
            ' WHERE (e.del = 0) AND (x.del = 0) AND (x.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            " GROUP BY ROLLUP (e.symbol || ' = ' || e.name) ORDER BY (e.symbol || ' = ' || e.name))"

          source = 'fullSD'

          poolGetConnection(sqlQuery, source)
          break
        //
        //
        //
        case 'show_CS_Full':
          // products wanted
          new Promise<Product[]>((resolve, reject) => {
            const sql = 'SELECT * FROM prod WHERE del = 0 ORDER BY symbol'
            pool.connect().then((client: any) => {
              return client
                .query(sql, [])
                .then((results: any) => {
                  client.release()

                  sqlProdSum = results.rows.reduce(
                    (sum: number, item: Product) =>
                      sum +
                      'SUM(CASE WHEN s.cust = c.id AND s.prod = ' +
                      item.id +
                      ' THEN (s.sum + s.sumd) ELSE 0 END) AS pSum' +
                      String(item.id) +
                      ', ',
                    ''
                  )

                  sqlQuery =
                    'SELECT c.name,' +
                    sqlProdSum +
                    ' SUM(s.sum + s.sumd) AS gross FROM customers AS c' +
                    ' LEFT JOIN sales AS s ON s.cust = c.id' +
                    ' WHERE (c.del = 0) AND (s.del = 0) AND (s.date BETWEEN ' +
                    startDate +
                    ' AND ' +
                    finishDate +
                    ') ' +
                    currentCustomer +
                    ' GROUP BY ROLLUP (c.name) ORDER BY c.name'

                  source = 'full'

                  poolGetConnection(sqlQuery, source)

                  resolve(results.rows)
                })
                .catch((err: any) => {
                  client.release()
                  console.log('initProdERROR: ', err.stack)
                  resolve([])
                })
            }) //
          })

          break
        //
        //
        //
        case 'show_C_History':
          sqlQuery =
            'SELECT s.id, c.name, s.date, p.name AS product, p.symbol AS symbol, s.sum, s.sumd FROM sales AS s ' +
            ' LEFT JOIN prod AS p ON p.id = s.prod' +
            currCustJoin +
            ' WHERE (p.del = 0) AND (s.del = 0) AND (s.date BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            ' ORDER BY s.date DESC'

          source = 'short'

          if (parsedReq.currentCustomer.id === 0) {
            res.status(404).json({ error: ' select Customer !' })
            reject(null)
            break
          }
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
