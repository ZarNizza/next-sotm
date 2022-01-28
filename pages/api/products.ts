import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2";
import type { Product } from "../products";

type ApiData = {
  data?: Product[];
  error?: string;
};

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiData>
) {
  if (req.method === "POST") {
    const parsedReq = JSON.parse(req.body);
    connection.query(
      "INSERT INTO prod (pname, psymbol) VALUES (?, ?)",
      [parsedReq.ptext.substring(0, 50), parsedReq.psymbol.substring(0, 7)],
      function (error, results, fields) {
        if (error) {
          res.status(500).json({ error: String(error) });
        }
        res.status(201).json({ data: results as Product[] });
        return;
      }
    );
  } else if (req.method === "GET") {
    connection.query("SELECT * FROM prod", function (error, results, fields) {
      if (error) {
        res.status(500).json({ error: String(error) });
      }
      res.status(200).json({ data: (results as Product[]) || [] });
      return;
    });
  }
}
