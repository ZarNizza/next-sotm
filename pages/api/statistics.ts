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
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

const timeZone = '04'

export default async function sysHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // init products
  const products = await new Promise<Product[]>((resolve, reject) => {
    const sql = 'SELECT * FROM prod WHERE pdel = 0'
    pool.connect().then((client: any) => {
      return client
        .query(sql, [])
        .then((results: any) => {
          client.release()
          // console.log('init Products result: ', results.rows)
          resolve(results.rows)
        })
        .catch((err: any) => {
          client.release()
          console.log('initProdERROR: ', err.stack)
          resolve([])
        })
    }) //
  })

  return new Promise((resolve, reject) => {
    // common function
    function poolGetConnection(sqlQuery: string, source: string) {
      // console.log('\n\n pool sqlQuery: ', sqlQuery)
      pool.connect().then((client: any) => {
        return client
          .query(sqlQuery, [])
          .then((results: any) => {
            client.release()
            res.status(201).json({ data: results.rows, source: source })
            // console.log('Promise result:', results)
            // console.log('Promise result rows', results.rows, '\n\n')
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
      if (parsedReq.currentCustomer.cid !== 0) {
        currentCustomer = ` AND (c.cid = ${parsedReq.currentCustomer.cid}) AND (c.cdel = 0) `
        currCustJoin = ' LEFT JOIN customers AS c ON c.cid = s.cust'
      }
    }

    let startDate = parsedReq.startDate
      ? "'" + parsedReq.startDate + " 00:00:00'"
      : "'2020-01-01 00:00:00'"
    let finishDate = "'2099-12-31 00:00:00'"

    if (parsedReq.finishDate) {
      const fDate = new Date(parsedReq.finishDate)
      fDate.setDate(fDate.getDate() + 1)
      let finDate = String(fDate.getFullYear()) + '-'
      if (fDate.getMonth() < 9) finDate += '0'
      finDate += String(fDate.getMonth() + 1) + '-'
      if (fDate.getDate() < 10) finDate += '0'
      finDate += String(fDate.getDate())
      finishDate = "'" + finDate + " 00:00:00'"
    }

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
        case 'show_S':
          sqlQuery =
            'SELECT p.psymbol, SUM(CASE WHEN s.prod = p.pid THEN s.sum ELSE 0 END) AS gross FROM prod AS p ' +
            ' LEFT JOIN sales AS s ON s.prod = p.pid' +
            currCustJoin +
            ' WHERE (p.pdel = 0) AND (s.sdel = 0) AND (s.sdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            ' GROUP BY ROLLUP (p.psymbol)'

          source = 'short'

          poolGetConnection(sqlQuery, source)

          break
        //
        case 'show_X':
          sqlQuery =
            'SELECT e.esymbol, SUM(CASE WHEN x.xitem = e.eid THEN x.xsum ELSE 0 END) AS Xgross FROM eitems AS e' +
            ' LEFT JOIN xpenses AS x ON x.xitem = e.eid' +
            ' WHERE (e.edel = 0) AND (x.xdel = 0) AND (x.xdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            ' GROUP BY ROLLUP (e.esymbol)'

          source = 'short'

          poolGetConnection(sqlQuery, source)
          break
        //
        case 'show_SX':
          sqlQuery =
            'SELECT p.psymbol, SUM(CASE WHEN s.prod = p.pid THEN s.sum ELSE 0 END) AS gross FROM prod AS p' +
            ' LEFT JOIN sales AS s ON s.prod = p.pid' +
            currCustJoin +
            ' WHERE (p.pdel = 0) AND (s.sdel = 0) AND (s.sdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            ' GROUP BY ROLLUP (p.psymbol) ' +
            'UNION ALL ' +
            'SELECT e.esymbol, SUM(CASE WHEN x.xitem = e.eid THEN x.xsum ELSE 0 END) AS Xgross FROM eitems AS e' +
            ' LEFT JOIN xpenses AS x ON x.xitem = e.eid' +
            ' WHERE (e.edel = 0) AND (x.xdel = 0) AND (x.xdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ')' +
            'GROUP BY ROLLUP (e.esymbol)'

          source = 'short'

          poolGetConnection(sqlQuery, source)

          break
        //
        case 'show_S_Full':
          sqlDPSum = dates.reduce(
            (sum, item, i) =>
              sum +
              "SUM(CASE WHEN DATE(s.sdate) = '" +
              item +
              "' AND s.prod = p.pid " +
              ' THEN s.sum ELSE 0 END) AS "' +
              item.slice(5) +
              '", ',
            ''
          )

          sqlQuery =
            'SELECT p.psymbol, ' +
            sqlDPSum +
            ' SUM(CASE WHEN s.prod = p.pid THEN s.sum ELSE 0 END) AS sum FROM prod AS p' +
            ' LEFT JOIN sales AS s ON s.prod = p.pid' +
            currCustJoin +
            ' WHERE (p.pdel = 0) AND (s.sdel = 0) AND (s.sdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            ' GROUP BY ROLLUP (p.psymbol)'

          source = 'fullSD'

          poolGetConnection(sqlQuery, source)
          break
        //
        //
        case 'show_SX_Full':
          sqlDPSum = dates.reduce(
            (sum, item, i) =>
              sum +
              "SUM(CASE WHEN DATE(s.sdate) = '" +
              item +
              "' AND s.prod = p.pid " +
              ' THEN s.sum ELSE 0 END) AS "' +
              item.slice(5) +
              '", ',
            ''
          )
          sqlDXSum = dates.reduce(
            (sum, item, i) =>
              sum +
              "SUM(CASE WHEN DATE(x.xdate) = '" +
              item +
              "' AND x.xitem = e.eid " +
              ' THEN x.xsum ELSE 0 END) AS "' +
              item.slice(5) +
              '", ',
            ''
          )

          sqlQuery =
            'SELECT p.psymbol, ' +
            sqlDPSum +
            ' SUM(CASE WHEN s.prod = p.pid THEN s.sum ELSE 0 END) AS sum FROM prod AS p' +
            ' LEFT JOIN sales AS s ON s.prod = p.pid' +
            currCustJoin +
            ' WHERE (p.pdel = 0) AND (s.sdel = 0) AND (s.sdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            ' GROUP BY ROLLUP (p.psymbol)' +
            ' UNION ALL ' +
            'SELECT e.esymbol,' +
            sqlDXSum +
            ' SUM(CASE WHEN x.xitem = e.eid THEN x.xsum ELSE 0 END) AS Xgross FROM eitems AS e' +
            ' LEFT JOIN xpenses AS x ON x.xitem = e.eid' +
            ' WHERE (e.edel = 0) AND (x.xdel = 0) AND (x.xdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            ' GROUP BY ROLLUP (e.esymbol)'

          source = 'fullSD'

          poolGetConnection(sqlQuery, source)
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
            ' WHERE (c.cdel = 0) AND (s.sdel = 0) AND (s.sdate BETWEEN ' +
            startDate +
            ' AND ' +
            finishDate +
            ') ' +
            currentCustomer +
            ' GROUP BY ROLLUP (c.cname)'

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
