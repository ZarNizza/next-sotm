import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Sale, Customer, Product } from '../plus'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

function SaveSale(args: Sale) {
  return new Promise((resolveSS, rejectSS) => {
    console.log('========= SaveSale args === ', args)
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
  const customers = [1, 2]
  const products = [5, 6]

  // let iDate = new Date()
  // const findate = new Date()
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
