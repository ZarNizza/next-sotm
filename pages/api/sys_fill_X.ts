import type { NextApiRequest, NextApiResponse } from 'next'
import serialiseDate from '../../components/serialiseDate'
import type { Xpense } from '../minus'

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

function SaveXpense(args: Xpense) {
  return new Promise((resolveSS, rejectSS) => {
    const sql = 'INSERT INTO xpenses (date, xitem, sum) VALUES ($1, $2, $3)'
    const params = [args.date, Number(args.xitem), Number(args.sum)]
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
  console.log('NEW FILL XPENSES')
  const expItems = [1, 2, 3]

  let iDate = new Date(2022, 1, 10, 11)
  const findate = new Date(2022, 1, 10, 11)
  let dates: string[] = []

  for (; iDate <= findate; iDate.setDate(iDate.getDate() + 1)) {
    dates.push(serialiseDate(iDate, timeZone))
  }

  return Promise.all(
    expItems
      .map((xitem) => {
        return dates.map((date) => {
          const sum = xitem
          return SaveXpense({ date, xitem, sum })
        })
      })
      .flat(1)
  )
    .then(() => res.status(203).json({ data: 'OK' }))
    .catch((error) =>
      res.status(500).json({ error: String('!api/sys fill_X err:' + error) })
    )
}
