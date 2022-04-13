import type { NextApiRequest, NextApiResponse } from 'next'

const { Pool } = require('pg')
const pool = new Pool({
  connectionString: process.env.PG_URI,
  ssl: {
    rejectUnauthorized: false
  }
})
pool.on('error', (err: any, client: any) => {
  console.error('X3 error on DB: ', err)
  process.exit(-1)
})

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  //
  let sql = ''
  let err_prefix = ''
  let retRes = false
  const parsedReq = JSON.parse(req.body)
  const dbPrefix = parsedReq.dbPrefix

  if (req.method === 'POST') {
    switch (parsedReq.mode) {
      //

      case 'drop_Customers':
        sql = 'DROP TABLE ' + dbPrefix + 'customers'
        err_prefix = 'drop_Customers'
        break

      case 'drop_Products':
        sql = 'DROP TABLE ' + dbPrefix + 'prod'
        err_prefix = 'drop_Products'
        break

      case 'drop_Sales':
        sql = 'DROP TABLE ' + dbPrefix + 'sales'
        err_prefix = 'drop_Sales'
        break

      case 'drop_Xpenses':
        sql = 'DROP TABLE ' + dbPrefix + 'xpenses'
        err_prefix = 'drop_Xpenses'
        break

      case 'drop_Eitems':
        sql = 'DROP TABLE ' + dbPrefix + 'eitems'
        err_prefix = 'drop_Eitems'
        break

      case 'restore_Users':
        sql =
          'CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, md5 VARCHAR(32) DEFAULT "0", name VARCHAR(50), phone VARCHAR(20), gooid VARCHAR(30), del SMALLINT DEFAULT 0)'
        //CREATE INDEX u ON users (lower(name), phone)
        err_prefix = 'restore_Users'
        break

      case 'restore_Customers':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          dbPrefix +
          'customers (id SERIAL PRIMARY KEY, name VARCHAR(50), phone VARCHAR(20), gooid VARCHAR(30), del SMALLINT DEFAULT 0)'
        //CREATE INDEX c ON customers (lower(name), phone)
        err_prefix = 'restore_Customers'
        break

      case 'restore_Products':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          dbPrefix +
          'prod (id SERIAL PRIMARY KEY, name VARCHAR(50), symbol VARCHAR(7), price INT DEFAULT 0, del SMALLINT DEFAULT 0)'
        err_prefix = 'restore_Products'
        break

      case 'restore_Sales':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          dbPrefix +
          'sales (id SERIAL PRIMARY KEY, date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, cust SMALLINT, prod SMALLINT, sum INT, sumd INT, del SMALLINT DEFAULT 0)'
        //CREATE INDEX s ON sales (cust, prod, date)
        err_prefix = 'restore_Sales'
        break

      case 'restore_Xpenses':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          dbPrefix +
          'xpenses (id SERIAL PRIMARY KEY, date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, xitem SMALLINT, sum INT, del SMALLINT DEFAULT 0)'
        //CREATE INDEX x ON xpenses (xitem, date)
        err_prefix = 'restore_Xpenses'
        break

      case 'restore_Eitems':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          dbPrefix +
          'eitems (id SERIAL PRIMARY KEY, name VARCHAR(50), symbol VARCHAR(7), price INT DEFAULT 0, del SMALLINT DEFAULT 0)'
        err_prefix = 'restore_Eitems'
        break

      case 'index_Users':
        sql = 'CREATE INDEX u ON users (lower(name), phone)'
        err_prefix = 'index_Users'
        break

      case 'index_Customers':
        sql = 'CREATE INDEX c ON ' + dbPrefix + 'customers (lower(name), phone)'
        err_prefix = 'index_Customers'
        break

      case 'index_Sales':
        sql = 'CREATE INDEX s ON ' + dbPrefix + 'sales (cust, prod, date)'
        err_prefix = 'index_Sales'
        break

      case 'index_Xpenses':
        sql = 'CREATE INDEX x ON ' + dbPrefix + 'xpenses (xitem, date)'
        err_prefix = 'index_Xpenses'
        break

      case 'show_Tables':
        sql =
          "SELECT tablename FROM pg_catalog.pg_tables WHERE schemaname != 'pg_catalog' AND schemaname != 'information_schema' GROUP BY tablename"
        err_prefix = 'show_Tables'
        retRes = true
        break

      case 'show_Users':
        sql = 'SELECT * FROM users ORDER BY id DESC'
        err_prefix = 'show_Users'
        retRes = true
        break

      case 'show_Customers':
        sql = 'SELECT * FROM ' + dbPrefix + 'customers ORDER BY id DESC'
        err_prefix = 'show_Customers'
        retRes = true
        break

      case 'show_Products':
        sql = 'SELECT * FROM ' + dbPrefix + 'prod ORDER BY id DESC'
        err_prefix = 'show_Products'
        retRes = true
        break

      case 'show_Sales':
        sql = 'SELECT * FROM ' + dbPrefix + 'sales ORDER BY id DESC'
        err_prefix = 'show_Sales'
        retRes = true
        break

      case 'show_Xpenses':
        sql = 'SELECT * FROM ' + dbPrefix + 'xpenses ORDER BY id DESC'
        err_prefix = 'show_Xpenses'
        retRes = true
        break

      case 'show_Eitems':
        sql = 'SELECT * FROM ' + dbPrefix + 'eitems ORDER BY id DESC'
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
