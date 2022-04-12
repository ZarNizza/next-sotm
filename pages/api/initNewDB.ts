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
  let sql = ''
  let err_prefix = ''
  let retRes = false
  const mode = JSON.parse(req.body).mode
  const userMD5 = JSON.parse(req.body).userMD5
  console.log('= = = = = initNewDB API - start, mode:', mode)

  if (req.method === 'POST') {
    switch (mode) {
      //

      case 'newU_C':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          userMD5 +
          'customers (id SERIAL PRIMARY KEY, name VARCHAR(50), phone VARCHAR(20), gooid VARCHAR(30), del SMALLINT DEFAULT 0)'
        err_prefix = 'restore_Customers'

        break

      case 'newU_P':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          userMD5 +
          'prod (id SERIAL PRIMARY KEY, name VARCHAR(50), symbol VARCHAR(7), price INT DEFAULT 0, del SMALLINT DEFAULT 0)'
        err_prefix = 'restore_Products'

        break

      case 'newU_S':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          userMD5 +
          'sales (id SERIAL PRIMARY KEY, date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, cust SMALLINT, prod SMALLINT, sum INT, sumd INT, del SMALLINT DEFAULT 0)'
        err_prefix = 'restore_Sales'

        break

      case 'newU_X':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          userMD5 +
          'xpenses (id SERIAL PRIMARY KEY, date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP, xitem SMALLINT, sum INT, del SMALLINT DEFAULT 0)'
        err_prefix = 'restore_Xpenses'

        break

      case 'newU_E':
        sql =
          'CREATE TABLE IF NOT EXISTS ' +
          userMD5 +
          'eitems (id SERIAL PRIMARY KEY, name VARCHAR(50), symbol VARCHAR(7), price INT DEFAULT 0, del SMALLINT DEFAULT 0)'
        err_prefix = 'restore_Eitems'

        break

      case 'indexU_C':
        sql =
          'CREATE INDEX IF NOT EXISTS c ON ' +
          userMD5 +
          'customers (lower(name), phone)'
        err_prefix = 'index_Customers'
        break

      case 'indexU_S':
        sql =
          'CREATE INDEX IF NOT EXISTS s ON ' +
          userMD5 +
          'sales (cust, prod, date)'
        err_prefix = 'index_Sales'
        break

      case 'indexU_X':
        sql =
          'CREATE INDEX IF NOT EXISTS x ON ' + userMD5 + 'xpenses (xitem, date)'
        err_prefix = 'index_Xpenses'
        break

      default:
        break
    }
  }

  if (sql === '') {
    return res.status(500).json({
      error: String('Error: empty sql request.')
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
