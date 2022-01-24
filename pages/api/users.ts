// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";
import type { User } from "../../pages/index";

type Data = {
  data?: User[];
  error?: string;
};

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// connection.connect();

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    connection.query(
      "INSERT INTO users (name) VALUES (?)",
      req.body,
      function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) });
        }
        res.status(201).json({ data: results as User[] });
        return;
      }
    );
  } else if (req.method === "GET") {
    connection.query("SELECT * FROM users", function (error, results, fields) {
      if (error) {
        res.status(500).json({ error: String(error) });
      }
      console.log(results);
      res.status(200).json({ data: results as User[] });
      return;
    });
  }
  // res.status(404).end();
  // connection.end();
}
