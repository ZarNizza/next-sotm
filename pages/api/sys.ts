import type { NextApiRequest, NextApiResponse } from 'next'
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
          'CREATE TABLE IF NOT EXISTS users (uid SERIAL PRIMARY KEY, uname VARCHAR(50), uphone VARCHAR(20), gooid VARCHAR(30), timezone SMALLINT, udel SMALLINT DEFAULT 0)'
        //CREATE INDEX u ON users (lower(uname), uphone)
        err_prefix = 'restore_Users'
        break

      case 'restore_Customers':
        sql =
          'CREATE TABLE IF NOT EXISTS customers (cid SERIAL PRIMARY KEY, cname VARCHAR(50), cphone VARCHAR(20), gooid VARCHAR(30), cdel SMALLINT DEFAULT 0)'
        //CREATE INDEX c ON customers (lower(cname), cphone)
        err_prefix = 'restore_Customers'
        break

      case 'restore_Products':
        sql =
          'CREATE TABLE IF NOT EXISTS prod (pid SERIAL PRIMARY KEY, pname VARCHAR(50), psymbol VARCHAR(7), pdel SMALLINT DEFAULT 0)'
        err_prefix = 'restore_Products'
        break

      case 'restore_Sales':
        sql =
          'CREATE TABLE IF NOT EXISTS sales (sid SERIAL PRIMARY KEY, sdate DATE, cust SMALLINT, prod SMALLINT, sum SMALLINT, sdel SMALLINT DEFAULT 0)'
        //CREATE INDEX s ON sales (cust, prod, sdate)
        err_prefix = 'restore_Sales'
        break

      case 'restore_Xpenses':
        sql =
          'CREATE TABLE IF NOT EXISTS xpenses (xid SERIAL PRIMARY KEY, xdate DATE, xitem SMALLINT, xsum SMALLINT, xdel SMALLINT DEFAULT 0)'
        //CREATE INDEX x ON xpenses (xitem, xdate)
        err_prefix = 'restore_Xpenses'
        break

      case 'restore_Eitems':
        sql =
          'CREATE TABLE IF NOT EXISTS eitems (eid SERIAL PRIMARY KEY, ename VARCHAR(50), esymbol VARCHAR(7), edel SMALLINT DEFAULT 0)'
        err_prefix = 'restore_Eitems'
        break

      case 'index_Users':
        sql = 'CREATE INDEX u ON users (lower(uname), uphone)'
        err_prefix = 'index_Users'
        break

      case 'index_Customers':
        sql = 'CREATE INDEX c ON customers (lower(cname), cphone)'
        err_prefix = 'index_Customers'
        break

      case 'index_Sales':
        sql = 'CREATE INDEX s ON sales (cust, prod, sdate)'
        err_prefix = 'index_Sales'
        break

      case 'index_Xpenses':
        sql = 'CREATE INDEX x ON xpenses (xitem, xdate)'
        err_prefix = 'index_Xpenses'
        break

      case 'show_Tables':
        sql =
          "SELECT * FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema'"
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
      pool.connect().then((client: any) => {
        return client
          .query(sql, [])
          .then((results: any) => {
            retRes
              ? res.status(200).json({ data: results.rows })
              : res.status(203).json({ data: 'OK' })
            client.release()
            // console.log(results.rows)
            resolve(null)
          })
          .catch((err: any) => {
            res.status(500).json({
              error: String(err)
            })
            client.release()
            console.log(err.stack)
            resolve(null)
          })
      })
    }) //end Promise
  }
}
