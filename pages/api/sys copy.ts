// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default function sysHandler(req: NextApiRequest, res: NextApiResponse) {
  function db_req(sql: string) {
    connection.query(sql, function (error, results, fields) {
      if (error) {
        res.status(500).json({ error: String(error) });
      }
      res.status(200).json({ data: sql });
      return;
    });
  }

  if (req.method === "POST" && req.body === "reset_DB") {
    db_req("DELETE FROM t WHERE 1");
    db_req("SELECT * FROM t");
  }
}
