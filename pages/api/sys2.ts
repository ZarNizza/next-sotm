import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'
import type { Sale, Customer, Product } from '../add'
// import InitCustomers from '../../components/initCustomers'
// import InitProducts from '../../components/initProducts'
// import { useState } from 'react'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  // init customers
  new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) throw err // not connected!
      connection.query(
        'SELECT * FROM customers',
        function (error, results, fields) {
          if (error) {
            console.log('MySQL ERROR', error)
            reject(error)
            return
          } else {
            // console.log('MySQL result', results)
            console.log('+++++++++++ MySQL result OK')
          }
        }
      )
    })
    resolve(null)
  })

  function SaveSale(props: Sale) {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) throw err // not connected!
        connection.query(
          'INSERT INTO sales (sdate, cust, prod, sum) VALUES (?, ?, ?, ?)',
          [
            props.data,
            Number(props.customer),
            Number(props.prod),
            Number(props.sum)
          ],
          function (error, results, fields) {
            connection.release()
            if (error) {
              res
                .status(500)
                .json({ error: String('!api clear_Sales err:' + error) })
              console.log('! saveSaleError! --------------', error)
              console.log(
                '!',
                props.customer,
                props.prod,
                props.sum,
                props.data
              )
              reject(error)
              return
            } else {
              res.status(203).json({ data: results })
            }
            return
          }
        )
      })
      resolve(null)
    })
  }

  //
  //
  //
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      switch (req.body) {
        case 'drop_Sales':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'DROP TABLE sales',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api drop_Sales err:' + error) })
                  reject(error)
                } else {
                  res.status(203).json({ data: results })
                }
              }
            )
          })
          resolve(null)
          break

        case 'create_Sales':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              // "CREATE TABLE IF NOT EXISTS sales (sid INT AUTO_INCREMENT PRIMARY KEY, sdate DATETIME, cust SMALLINT, ptype ENUM('Маникюр', 'Маникюр+Лак', 'Маникюр+Гель', 'Педикюр', 'Педикюр+Лак', 'Педикюр+Гель', 'Бровки', 'Реснички'), sum SMALLINT)",
              'CREATE TABLE IF NOT EXISTS sales (sid INT AUTO_INCREMENT PRIMARY KEY, sdate DATETIME, cust SMALLINT, prod SMALLINT, sum SMALLINT)',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api restoreSales err:' + error) })
                  reject(error)
                } else {
                  res.status(207).json({ data: results })
                }
              }
            )
          })
          resolve(null)
          break

        case 'clear_Sales':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'DELETE FROM sales WHERE 1',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api clear_Sales err:' + error) })
                  reject(error)
                } else {
                  res.status(203).json({ data: results })
                }
              }
            )
          })
          resolve(null)
          break

        case 'fill_Sales':
          console.log('FILL SALES')
          const customers = [1, 2]
          const products = [5, 6]
          let id = new Date(2021, 0, 1, 11)
          const findate = new Date(2021, 0, 4, 11)
          for (; id < findate; id.setDate(id.getDate() + 1)) {
            customers.forEach((cItem) => {
              products.forEach((pItem) => {
                // console.log(id, cItem, pItem)
                const prop: Sale = {
                  sid: 0,
                  data: id,
                  customer: cItem,
                  prod: pItem,
                  sum: cItem
                }
                SaveSale(prop)
              })
            })
          }
          resolve(null)
          break

        case 'show_Sales':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'SELECT * FROM sales',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api showSales err:' + error) })
                  reject(error)
                } else {
                  res.status(200).json({ data: results })
                }
              }
            )
          })
          resolve(null)
          break

        default:
          res.status(404).json({ data: '!api default case' })
          resolve(null)
          break
      }
    }
  })
}
