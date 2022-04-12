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
    apiSuffix: 'initNewDB',
    title: 'initNewDB',
    body: JSON.stringify({
      mode: 'newU_C',
      userMD5: c.u
    })
  }

  fetchHandler(args)
    .then(() => {
      localStorage.setItem(c.u + 'customers', JSON.stringify(''))
      args.body = JSON.stringify({
        mode: 'newU_P',
        userMD5: c.u
      })
      fetchHandler(args).then(() => {
        localStorage.setItem(c.u + 'prod', JSON.stringify(''))
        args.body = JSON.stringify({
          mode: 'newU_E',
          userMD5: c.u
        })
        fetchHandler(args).then(() => {
          localStorage.setItem(c.u + 'eitems', JSON.stringify(''))
          args.body = JSON.stringify({
            mode: 'newU_S',
            userMD5: c.u
          })
          fetchHandler(args).then(() => {
            localStorage.setItem(c.u + 'sales', JSON.stringify(''))
            args.body = JSON.stringify({
              mode: 'newU_X',
              userMD5: c.u
            })
            fetchHandler(args).then(() => {
              localStorage.setItem(c.u + 'xpenses', JSON.stringify(''))
              args.body = JSON.stringify({
                mode: 'indexU_C',
                userMD5: c.u
              })
              fetchHandler(args).then(() => {
                args.body = JSON.stringify({
                  mode: 'indexU_S',
                  userMD5: c.u
                })
                fetchHandler(args).then(() => {
                  args.body = JSON.stringify({
                    mode: 'indexU_X',
                    userMD5: c.u
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
