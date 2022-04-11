import styles from '../styles/Home.module.css'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

export default function InitNewDB() {
  const c = useContext(AppContext)

  let items: string | null = ''
  const apiSuffix = c.u + 'customers'

  try {
    items = localStorage.getItem(apiSuffix)
    if (items === null) throw null
    if (items !== '') {
      console.log('Init ', apiSuffix, ' - LocStor GOOD')
    } else {
      console.log('Init ', apiSuffix, ' - LocStor error - empty response')
    }
  } catch {
    console.log(
      'Init ',
      apiSuffix,
      ' catch-api - NO LocalStorage Data >>> go fetch DB'
    )
    //
    //
    //
  }

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
