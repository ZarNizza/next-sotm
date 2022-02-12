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

function SaveSale(args: Sale) {
  return new Promise((resolveSS, rejectSS) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err // not connected!
      connection.query(
        'INSERT INTO sales (sdate, cust, prod, sum) VALUES (?, ?, ?, ?)',
        [args.sdate, Number(args.cust), Number(args.prod), Number(args.sum)],
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
  console.log('NEW FILL SALES')
  const customers = [1, 2, 3, 4, 5]
  const products = [5, 6, 7, 8, 9, 10]

  let iDate = new Date(2022, 1, 10, 11)
  const findate = new Date(2022, 1, 10, 11)
  let dates: string[] = []

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
    timeZone +
    ':00:00'
  )
}
