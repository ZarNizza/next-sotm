import styles from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'

export default function InitNewDB(dbPrefix: string) {
  console.log('* * * * * * * InitNewDB start')

  try {
    localStorage.setItem(dbPrefix, JSON.stringify(''))
  } catch {
    console.log('localStorage test FAIL')
    return
  }
  console.log('localStorage test GOOD')

  let args: FetchArgs = {
    method: 'POST',
    apiSuffix: 'sys',
    title: 'initNewDB \n',
    body: JSON.stringify({
      mode: 'restore_Customers',
      dbPrefix: dbPrefix
    })
  }
  fetchHandler(args)
    .then(() => {
      localStorage.setItem(dbPrefix + 'customers', JSON.stringify(''))
      args.apiSuffix = 'sys'
      args.body = JSON.stringify({
        mode: 'restore_Products',
        dbPrefix: dbPrefix
      })
      fetchHandler(args).then(() => {
        localStorage.setItem(dbPrefix + 'prod', JSON.stringify(''))
        args.apiSuffix = 'sys'
        args.body = JSON.stringify({
          mode: 'restore_Eitems',
          dbPrefix: dbPrefix
        })
        fetchHandler(args).then(() => {
          localStorage.setItem(dbPrefix + 'eitems', JSON.stringify(''))
          args.apiSuffix = 'sys'
          args.body = JSON.stringify({
            mode: 'restore_Sales',
            dbPrefix: dbPrefix
          })
          fetchHandler(args).then(() => {
            localStorage.setItem(dbPrefix + 'sales', JSON.stringify(''))
            args.apiSuffix = 'sys'
            args.body = JSON.stringify({
              mode: 'restore_Xpenses',
              dbPrefix: dbPrefix
            })
            fetchHandler(args).then(() => {
              localStorage.setItem(dbPrefix + 'xpenses', JSON.stringify(''))
              args.apiSuffix = 'sys'
              args.body = JSON.stringify({
                mode: 'index_Customers',
                dbPrefix: dbPrefix
              })
              fetchHandler(args).then(() => {
                args.apiSuffix = 'sys'
                args.body = JSON.stringify({
                  mode: 'index_Sales',
                  dbPrefix: dbPrefix
                })
                fetchHandler(args).then(() => {
                  args.apiSuffix = 'sys'
                  args.body = JSON.stringify({
                    mode: 'index_Xpenses',
                    dbPrefix: dbPrefix
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
