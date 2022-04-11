import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/layout'
import { AppContext } from '../components/AppContext'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const t: Record<string, string> = useRouter().locale === 'en' ? en : ru
  var md5 = require('md5')
  // const u: string = session ? md5(session.user.email) : ''
  const u: string = session ? md5(session.user.email) : md5('Yohoho!')
  //
  const contextData = { u, t }
  return (
    <SessionProvider session={pageProps.session}>
      <AppContext.Provider value={contextData}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContext.Provider>
    </SessionProvider>
  )
}

export default MyApp
