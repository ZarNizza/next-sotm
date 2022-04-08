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
  const contextData = { t }
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
