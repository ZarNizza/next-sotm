// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from 'mysql2'

type Data = {
  data?: string,
  error?: string
}

const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
})

connection.connect()

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  connection.query('SELECT * FROM t2 AS solution', function (error, results, fields) {

    if (error) {
      res.status(500).json({ error: String(error) })
    }
    res.status(200).json({ data: JSON.stringify(results) })

    connection.end();
  });
}
