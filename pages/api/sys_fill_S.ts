import type { NextApiRequest, NextApiResponse } from 'next'
import type { Sale, Customer, Product } from '../plus'

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

function SaveSale(args: Sale) {
  return new Promise((resolveSS, rejectSS) => {
    console.log('========= SaveSale args === ', args)
    const sql =
      'INSERT INTO sales (sdate, cust, prod, sum) VALUES ($1, $2, $3, $4)'
    const params = [
      args.sdate,
      Number(args.cust),
      Number(args.prod),
      Number(args.sum)
    ]
    pool.connect().then((client: any) => {
      return client
        .query(sql, params)
        .then((results: any) => {
          client.release()
          console.log(results.rows)
          resolveSS(null)
        })
        .catch((err: any) => {
          client.release()
          console.log(err.stack)
          resolveSS(null)
        })
    }) //
  })
}

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  console.log('NEW FILL SALES')
  const customers = [1, 2]
  const products = [5, 6]

  let iDate = new Date(2022, 1, 17, 12)
  const findate = new Date(2022, 1, 17, 12)
  let dates: string[] = []

  console.log('******** date=', findate, ' serDate=', serialiseDate(findate))

  for (; iDate <= findate; iDate.setDate(iDate.getDate() + 1)) {
    dates.push(serialiseDate(iDate))
  }

  return Promise.all(
    customers
      .map((cust) => {
        return products.map((prod) => {
          return dates.map((sdate) => {
            const sum = cust * prod
            return SaveSale({ cust, prod, sdate, sum })
          })
        })
      })
      .flat(2)
  )
    .then(() => res.status(203).json({ data: 'OK' }))
    .catch((error) =>
      res.status(500).json({ error: String('!api/sys fill_S err:' + error) })
    )
}

const timeZone = '04'
function serialiseDate(date: Date) {
  return (
    String(date.getFullYear()) +
    '-' +
    String(date.getMonth() + 1) +
    '-' +
    String(date.getDate()) +
    'T' +
    String(date.getHours()) +
    ':00:00'
  )
}
