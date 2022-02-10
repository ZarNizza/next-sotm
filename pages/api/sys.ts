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
  return new Promise((resolve, reject) => {
    if (req.method === 'POST') {
      switch (req.body) {
        //
        case 'clear_Users':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'TRUNCATE TABLE users',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api clear_Users err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'clear_Customers':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'TRUNCATE TABLE customers',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res.status(500).json({
                    error: String('!api clear_Customers err:' + error)
                  })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'clear_Sales':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'TRUNCATE TABLE sales',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api clear_Sales err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'clear_Xpenses':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'TRUNCATE TABLE xpenses',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api clear_Xpenses err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'clear_Eitems':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'TRUNCATE TABLE eitems',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api clear_Eitems err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'clear_Products':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'TRUNCATE TABLE prod',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api clear_Products err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'drop_Users':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'DROP TABLE users',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api drop_Users err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'drop_Customers':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'DROP TABLE customers',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api drop_Customers err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

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
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'drop_Xpenses':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'DROP TABLE xpenses',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api drop_Xpenses err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'drop_Eitems':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'DROP TABLE eitems',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api drop_Eitems err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'drop_Products':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'DROP TABLE prod',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api drop_Products err:' + error) })
                } else {
                  res.status(203).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'restore_Sales':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'CREATE TABLE IF NOT EXISTS sales (sid INT AUTO_INCREMENT PRIMARY KEY, sdate DATE, cust SMALLINT, prod SMALLINT, sum SMALLINT, INDEX (cust, prod, sdate))',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api restore_Sales err:' + error) })
                } else {
                  res.status(207).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'restore_Xpenses':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'CREATE TABLE IF NOT EXISTS xpenses (xid INT AUTO_INCREMENT PRIMARY KEY, xdate DATE, xitem SMALLINT, xsum SMALLINT, INDEX (xitem, xdate))',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res.status(500).json({
                    error: String('!api restore_Xpenseses err:' + error)
                  })
                } else {
                  res.status(207).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'restore_Eitems':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'CREATE TABLE IF NOT EXISTS eitems (eid SMALLINT AUTO_INCREMENT PRIMARY KEY, ename VARCHAR(50), esymbol VARCHAR(7))',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res.status(500).json({
                    error: String('!api restore_Eitems err:' + error)
                  })
                } else {
                  res.status(207).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'restore_Users':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'CREATE TABLE IF NOT EXISTS users (uid SMALLINT AUTO_INCREMENT PRIMARY KEY, uname VARCHAR(50), uphone VARCHAR(20), gooid VARCHAR(30), timezone TINYINT, INDEX (uname, uphone))',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api restore_Users err:' + error) })
                } else {
                  res.status(207).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'restore_Customers':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'CREATE TABLE IF NOT EXISTS customers (cid SMALLINT AUTO_INCREMENT PRIMARY KEY, cname VARCHAR(50), cphone VARCHAR(20), gooid VARCHAR(30), INDEX (cname, cphone))',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api restore_Cust err:' + error) })
                } else {
                  res.status(207).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'restore_Products':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'CREATE TABLE IF NOT EXISTS prod (pid SMALLINT AUTO_INCREMENT PRIMARY KEY, pname VARCHAR(50), psymbol VARCHAR(7))',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res.status(500).json({
                    error: String('!api restore_Products err:' + error)
                  })
                } else {
                  res.status(207).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'show_Tables':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query('SHOW TABLES', function (error, results, fields) {
              connection.release()
              if (error) {
                res
                  .status(500)
                  .json({ error: String('!api show_Tables err:' + error) })
              } else {
                res.status(200).json({ data: results })
              }
              resolve(null)
            })
          })
          break

        case 'show_Users':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'SELECT * FROM users',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api show_Users err:' + error) })
                } else {
                  res.status(200).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'show_Customers':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'SELECT * FROM customers',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api show_Customers err:' + error) })
                } else {
                  res.status(200).json({ data: results })
                }
                resolve(null)
              }
            )
          })
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
                    .json({ error: String('!api show_Sales err:' + error) })
                } else {
                  res.status(200).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'show_Xpenses':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'SELECT * FROM xpenses',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api show_Xpenses err:' + error) })
                } else {
                  res.status(200).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'show_Eitems':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'SELECT * FROM eitems',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api show_Eitems err:' + error) })
                } else {
                  res.status(200).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        case 'show_Products':
          pool.getConnection(function (err, connection) {
            if (err) throw err // not connected!
            connection.query(
              'SELECT * FROM prod',
              function (error, results, fields) {
                connection.release()
                if (error) {
                  res
                    .status(500)
                    .json({ error: String('!api show_Products err:' + error) })
                } else {
                  res.status(200).json({ data: results })
                }
                resolve(null)
              }
            )
          })
          break

        default:
          res.status(404).json({ data: '!api default case' })
          resolve(null)
          break
      }
    }
  })
}
