import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import serialiseDate from '../../components/serialiseDate'
import type { Xpense } from '../minus'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

const timeZone = '04'

function SaveXpense(args: Xpense) {
  return new Promise((resolveSS, rejectSS) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err // not connected!
      connection.query(
        'INSERT INTO xpenses (xdate, xitem, xsum) VALUES (?, ?, ?)',
        [args.xdate, Number(args.xitem), Number(args.xsum)],
        function (error, results, fields) {
          connection.release()
          if (error) {
            rejectSS(error)
          } else {
            resolveSS(null)
            return
          }
        }
      )
    })
    resolveSS(null)
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
        return dates.map((xdate) => {
          const xsum = xitem
          return SaveXpense({ xdate, xitem, xsum })
        })
      })
      .flat(1)
  )
    .then(() => res.status(203).json({ data: 'OK' }))
    .catch((error) =>
      res.status(500).json({ error: String('!api/sys fill_X err:' + error) })
    )
}
