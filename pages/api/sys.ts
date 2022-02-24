// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  let sql = ''
  let err_prefix = ''
  let retRes = false

  if (req.method === 'POST') {
    switch (req.body) {
      //
      case 'clear_Users':
        sql = 'TRUNCATE TABLE users'
        err_prefix = 'clear_Users'
        break

      case 'clear_Customers':
        sql = 'TRUNCATE TABLE customers'
        err_prefix = 'clear_Customers'
        break

      case 'clear_Products':
        sql = 'TRUNCATE TABLE prod'
        err_prefix = 'clear_Products'
        break

      case 'clear_Sales':
        sql = 'TRUNCATE TABLE sales'
        err_prefix = 'clear_Sales'
        break

      case 'clear_Xpenses':
        sql = 'TRUNCATE TABLE xpenses'
        err_prefix = 'clear_Xpenses'
        break

      case 'clear_Eitems':
        sql = 'TRUNCATE TABLE eitems'
        err_prefix = 'clear_Eitems'
        break

      case 'drop_Users':
        sql = 'DROP TABLE users'
        err_prefix = 'drop_Users'
        break

      case 'drop_Customers':
        sql = 'DROP TABLE customers'
        err_prefix = 'drop_Customers'
        break

      case 'drop_Products':
        sql = 'DROP TABLE prod'
        err_prefix = 'drop_Products'
        break

      case 'drop_Sales':
        sql = 'DROP TABLE sales'
        err_prefix = 'drop_Sales'
        break

      case 'drop_Xpenses':
        sql = 'DROP TABLE xpenses'
        err_prefix = 'drop_Xpenses'
        break

      case 'drop_Eitems':
        sql = 'DROP TABLE eitems'
        err_prefix = 'drop_Eitems'
        break

      case 'restore_Users':
        sql =
          'CREATE TABLE IF NOT EXISTS users (uid SMALLINT AUTO_INCREMENT PRIMARY KEY, uname VARCHAR(50), uphone VARCHAR(20), gooid VARCHAR(30), timezone TINYINT, udel TINYINT(1) DEFAULT 0, INDEX (uname, uphone))'
        err_prefix = 'restore_Users'
        break

      case 'restore_Customers':
        sql =
          'CREATE TABLE IF NOT EXISTS customers (cid SMALLINT AUTO_INCREMENT PRIMARY KEY, cname VARCHAR(50), cphone VARCHAR(20), gooid VARCHAR(30), cdel TINYINT(1) DEFAULT 0, INDEX (cname, cphone))'
        err_prefix = 'restore_Customers'
        break

      case 'restore_Products':
        sql =
          'CREATE TABLE IF NOT EXISTS prod (pid SMALLINT AUTO_INCREMENT PRIMARY KEY, pname VARCHAR(50), psymbol VARCHAR(7), pdel TINYINT(1) DEFAULT 0)'
        err_prefix = 'restore_Products'
        break

      case 'restore_Sales':
        sql =
          'CREATE TABLE IF NOT EXISTS sales (sid INT AUTO_INCREMENT PRIMARY KEY, sdate DATE, cust SMALLINT, prod SMALLINT, sum SMALLINT, sdel TINYINT(1) DEFAULT 0, INDEX (cust, prod, sdate))'
        err_prefix = 'restore_Sales'
        break

      case 'restore_Xpenses':
        sql =
          'CREATE TABLE IF NOT EXISTS xpenses (xid INT AUTO_INCREMENT PRIMARY KEY, xdate DATE, xitem SMALLINT, xsum SMALLINT, xdel TINYINT(1) DEFAULT 0, INDEX (xitem, xdate))'
        err_prefix = 'restore_Xpenses'
        break

      case 'restore_Eitems':
        sql =
          'CREATE TABLE IF NOT EXISTS eitems (eid SMALLINT AUTO_INCREMENT PRIMARY KEY, ename VARCHAR(50), esymbol VARCHAR(7), edel TINYINT(1) DEFAULT 0)'
        err_prefix = 'restore_Eitems'
        break

      case 'show_Tables':
        sql = 'SHOW TABLES'
        err_prefix = 'show_Tables'
        retRes = true
        break

      case 'show_Users':
        sql = 'SELECT * FROM users'
        err_prefix = 'show_Users'
        retRes = true
        break

      case 'show_Customers':
        sql = 'SELECT * FROM customers'
        err_prefix = 'show_Customers'
        retRes = true
        break

      case 'show_Products':
        sql = 'SELECT * FROM prod'
        err_prefix = 'show_Products'
        retRes = true
        break

      case 'show_Sales':
        sql = 'SELECT * FROM sales'
        err_prefix = 'show_Sales'
        retRes = true
        break

      case 'show_Xpenses':
        sql = 'SELECT * FROM xpenses'
        err_prefix = 'show_Xpenses'
        retRes = true
        break

      case 'show_Eitems':
        sql = 'SELECT * FROM eitems'
        err_prefix = 'show_Eitems'
        retRes = true
        break

      default:
        break
    }
  }

  if (sql === '') {
    return res.status(500).json({
      error: String('Error: unknown request.')
    })
  } else {
    return new Promise((resolve, reject) => {
      pool.getConnection(function (err, connection) {
        if (err) {
          // not connected!
          res.status(500).json({
            error: String('DataBase not connected!')
          })
          resolve('! DB not connected !')
        } else {
          connection.query(sql, function (error, results, fields) {
            connection.release()
            if (error) {
              res
                .status(500)
                .json({ error: String('!api ' + err_prefix + ' err:' + error) })
            } else {
              retRes
                ? res.status(200).json({ data: results })
                : res.status(203).json({ data: 'OK' })
            }
            resolve(null)
          })
        }
      }) //end pool...
    }) //end Promise
  }
}
