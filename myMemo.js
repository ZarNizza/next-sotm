;<>
  <table>
    <thead>
      <tr key={Math.random()}>
        <td key={Math.random()}>sID</td>
        <td key={Math.random()}>Cust</td>
        <td key={Math.random()}>Prod</td>
        <td key={Math.random()}>Sum</td>
        <td key={Math.random()}>Date</td>
      </tr>
    </thead>
    <tbody>
      {resData.map((item) => {
        return (
          <tr key={Math.random()}>
            <td key={Math.random()}>{item.sid}</td>
            <td key={Math.random()}>{item.cust}</td>
            <td key={Math.random()}>{item.prod}</td>
            <td key={Math.random()}>{item.sum}</td>
            <td key={Math.random()}>{String(item.sdate).slice(0, 10)}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
  <ul>
    {resData.map((item) => {
      return (
        <li key={Math.random()}>
          {item.sid} : {item.cust} _ {item.prod} _ {item.sum} _{' '}
          {String(item.sdate).slice(0, 10)}
        </li>
      )
    })}
  </ul>
</>
{
  /* ////////////////////////////////////////////////////////////// */
}
///////////////// 1.tsx (front)
function show_S_Handler() {
  const body = {
    mode: 'show_S'
  }
  fetch('/api/1', { method: 'POST', body: JSON.stringify(body) })
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        console.log('1tsx - res.error=', res.error)
        alert('!Error: ' + res.error)
      } else {
        console.log('1tsx -S front OK')
      }
    })
    .catch((error) => {
      console.log('!catch Error:', error.message)
      alert('!catch Error:' + error.message)
    })
}
///////////////// 1.ts (back)
export default async function sysHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((pResolve, pRej) => {
    const parsedReq = JSON.parse(req.body)
    //
    if (req.method === 'POST') {
      switch (parsedReq.mode) {
        case 'show_S':
          pool.getConnection(function (err, connection) {
            if (err) {
              // not connected!
              res.status(500).json({ error: 'DB not connected' })
            } else {
              connection.query(
                'select * from xpenses',
                function (error, results, fields) {
                  connection.release()
                  if (error) {
                    res.status(500).json({ error: String(error) })
                    console.log('!1back - error: ', error)
                    pRej(error)
                  } else {
                    res.status(201).json({ data: results, source: 'short' })
                    pResolve(results)
                  }
                }
              )
            }
          })
          break
        //
        default:
          break
      }
    }
  })
}
