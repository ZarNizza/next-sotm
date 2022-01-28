// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    switch (req.body) {
      case "clear_Users":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query(
            "DELETE FROM customers WHERE 1",
            function (error, results, fields) {
              connection.release();
              if (error) {
                res
                  .status(500)
                  .json({ error: String("!api clear_Users err:" + error) });
              }
              res.status(203).json({ data: results });
              return;
            }
          );
        });
        break;
      case "clear_Sales":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query(
            "DELETE FROM sales WHERE 1",
            function (error, results, fields) {
              connection.release();
              if (error) {
                res
                  .status(500)
                  .json({ error: String("!api clear_Sales err:" + error) });
              }
              res.status(203).json({ data: results });
              return;
            }
          );
        });
        break;
      case "clear_Prod":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query(
            "DELETE FROM prod WHERE 1",
            function (error, results, fields) {
              connection.release();
              if (error) {
                res
                  .status(500)
                  .json({ error: String("!api clear_Products err:" + error) });
              }
              res.status(203).json({ data: results });
              return;
            }
          );
        });
        break;
      case "restSales":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query(
            // "CREATE TABLE IF NOT EXISTS sales (sid INT AUTO_INCREMENT PRIMARY KEY, sdate DATETIME, cust SMALLINT, ptype ENUM('Маникюр', 'Маникюр+Лак', 'Маникюр+Гель', 'Педикюр', 'Педикюр+Лак', 'Педикюр+Гель', 'Бровки', 'Реснички'), sum SMALLINT)",
            "CREATE TABLE IF NOT EXISTS sales (sid INT AUTO_INCREMENT PRIMARY KEY, sdate DATETIME, cust SMALLINT, prod SMALLINT, sum SMALLINT)",
            function (error, results, fields) {
              connection.release();
              if (error) {
                res
                  .status(500)
                  .json({ error: String("!api restoreSales err:" + error) });
              }
              res.status(207).json({ data: results });
              return;
            }
          );
        });
        break;
      case "restCust":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query(
            "CREATE TABLE IF NOT EXISTS customers (cid SMALLINT AUTO_INCREMENT PRIMARY KEY, cname VARCHAR(50), cphone VARCHAR(20), gooid VARCHAR(30))",
            function (error, results, fields) {
              connection.release();
              if (error) {
                res
                  .status(500)
                  .json({ error: String("!api restoreCust err:" + error) });
              }
              res.status(207).json({ data: results });
              return;
            }
          );
        });
        break;
      case "restProd":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query(
            "CREATE TABLE IF NOT EXISTS prod (pid SMALLINT AUTO_INCREMENT PRIMARY KEY, pname VARCHAR(50), psymbol VARCHAR(7))",
            function (error, results, fields) {
              connection.release();
              if (error) {
                res
                  .status(500)
                  .json({ error: String("!api restoreProducts err:" + error) });
              }
              res.status(207).json({ data: results });
              return;
            }
          );
        });
        break;
      case "showTables":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query("SHOW TABLES", function (error, results, fields) {
            connection.release();
            if (error) {
              res
                .status(500)
                .json({ error: String("!api showTables err:" + error) });
            }
            res.status(200).json({ data: results });
            return;
          });
        });
        break;
      case "showUsers":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query(
            "SELECT * FROM customers",
            function (error, results, fields) {
              connection.release();
              if (error) {
                res
                  .status(500)
                  .json({ error: String("!api showUsers err:" + error) });
              }
              res.status(200).json({ data: results });
              return;
            }
          );
        });
        break;
      case "showSales":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query(
            "SELECT * FROM sales",
            function (error, results, fields) {
              connection.release();
              if (error) {
                res
                  .status(500)
                  .json({ error: String("!api showSales err:" + error) });
              }
              res.status(200).json({ data: results });
              return;
            }
          );
        });
        break;
      case "showProds":
        pool.getConnection(function (err, connection) {
          if (err) throw err; // not connected!
          connection.query(
            "SELECT * FROM prod",
            function (error, results, fields) {
              connection.release();
              if (error) {
                res
                  .status(500)
                  .json({ error: String("!api showProducts err:" + error) });
              }
              res.status(200).json({ data: results });
              return;
            }
          );
        });
        break;
      default:
        res.status(404).json({ data: "!api default case" });
        break;
    }
  }
}
