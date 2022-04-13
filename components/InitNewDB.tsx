import styles from '../styles/Home.module.css'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'

export default function InitNewDB() {
  const c = useContext(AppContext)
  console.log('* * * * * * * InitNewDB start')

  try {
    localStorage.setItem(c.u, JSON.stringify(''))
  } catch {
    console.log('localStorage set FAIL')
    return console.log('localStorage set FAIL-2')
  }
  console.log('localStorage set GOOD')

  let args: FetchArgs = {
    method: 'POST',
    apiSuffix: 'sys',
    title: 'initNewDB',
    body: JSON.stringify({
      mode: 'restore_Customers',
      dbPrefix: c.u
    })
  }

  fetchHandler(args)
    .then(() => {
      localStorage.setItem(c.u + 'customers', JSON.stringify(''))
      args.apiSuffix = 'sys'
      args.body = JSON.stringify({
        mode: 'restore_Products',
        dbPrefix: c.u
      })
      fetchHandler(args).then(() => {
        localStorage.setItem(c.u + 'prod', JSON.stringify(''))
        args.apiSuffix = 'sys'
        args.body = JSON.stringify({
          mode: 'restore_Eitems',
          dbPrefix: c.u
        })
        fetchHandler(args).then(() => {
          localStorage.setItem(c.u + 'eitems', JSON.stringify(''))
          args.apiSuffix = 'sys'
          args.body = JSON.stringify({
            mode: 'restore_Sales',
            dbPrefix: c.u
          })
          fetchHandler(args).then(() => {
            localStorage.setItem(c.u + 'sales', JSON.stringify(''))
            args.apiSuffix = 'sys'
            args.body = JSON.stringify({
              mode: 'restore_Xpenses',
              dbPrefix: c.u
            })
            fetchHandler(args).then(() => {
              localStorage.setItem(c.u + 'xpenses', JSON.stringify(''))
              args.apiSuffix = 'sys'
              args.body = JSON.stringify({
                mode: 'index_Customers',
                dbPrefix: c.u
              })
              fetchHandler(args).then(() => {
                args.apiSuffix = 'sys'
                args.body = JSON.stringify({
                  mode: 'index_Sales',
                  dbPrefix: c.u
                })
                fetchHandler(args).then(() => {
                  args.apiSuffix = 'sys'
                  args.body = JSON.stringify({
                    mode: 'index_Xpenses',
                    dbPrefix: c.u
                  })
                  fetchHandler(args)
                })
              })
            })
          })
        })
      })
    })

    .catch((error) =>
      console.log('! initNewDB - CATCH from fetchHandler - ', error.message)
    )

  return (
    <main className={styles.main}>
      <div className={styles.main}>
        <p>Hello!</p>
        <p>We create new DataBase for You.</p>
        <p>Let`s enjoy!</p>
      </div>
    </main>
  )
}
