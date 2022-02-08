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

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  function SaveSale(props: Sale) {
    return new Promise((resolveSS, rejectSS) => {
      pool.getConnection(function (err, connection) {
        if (err) throw err // not connected!
        connection.query(
          'INSERT INTO sales (sdate, cust, prod, sum) VALUES (?, ?, ?, ?)',
          [
            props.sdate,
            Number(props.cust),
            Number(props.prod),
            Number(props.sum)
          ],
          function (error, results, fields) {
            connection.release()
            if (error) {
              res
                .status(500)
                .json({ error: String('!api/sys2 clear_Sales err:' + error) })
              console.log('! saveSaleError! --------------', error)
              rejectSS(error)
            } else {
              res.status(203).json({ data: results })
              resolveSS(null)
              return
            }
          }
          )
        })
       resolveSS(null)
    })
  }

  console.log('NEW FILL SALES')
  const customers = [1, 2]
  const products = [5, 6]
  let iDate = new Date(2021, 0, 1, 11)
  const findate = new Date(2021, 0, 3, 11)
  for (; iDate <= findate; iDate.setDate(iDate.getDate() + 1)) {
    customers.forEach((cItem) => {
      products.forEach((pItem) => {
        const props: Sale = {
          sid: 0,
          sdate: String(iDate.getFullYear())+'-'+String(iDate.getMonth()+1)+'-'+String(iDate.getDate()),
          cust: cItem,
          prod: pItem,
          sum: cItem * pItem
        }
        console.log(props.sdate)
        // SaveSale(props)

        new Promise((resolveSS, rejectSS) => {
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'INSERT INTO sales (sdate, cust, prod, sum) VALUES (?, ?, ?, ?)',
              [
                props.sdate,
                Number(props.cust),
                Number(props.prod),
                Number(props.sum)
              ],
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api/sys2 clear_Sales err:' + error) })
                  console.log('! saveSaleError! --------------', error)
                  rejectSS(error)
                } else {
                  res.status(203).json({ data: results })
                  return
                }
                resolveSS(null)
              }
              )
            })
           resolveSS(null)
        })




      })
    })
  }
  return
}

