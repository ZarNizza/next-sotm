import { useSession } from 'next-auth/react'
import { AppContext } from './AppContext'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

export default function MyContext({ children }) {
  const { data: session } = useSession()
  const t = useRouter().locale === 'en' ? en : ru
  const md5 = require('md5')

  const u =
    typeof session !== undefined && !!session && !!session.user
      ? 'a' + md5(session.user.email) + '_'
      : ''
  //
  console.log('* * * start context u=', u)
  console.log('* * * session:', session)
  const contextData = { u, t }
  return (
    <>
      <AppContext.Provider value={contextData}>{children}</AppContext.Provider>
    </>
  )
}
