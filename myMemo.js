<>
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