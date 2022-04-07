import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import AppContextWrapper from '../components/AppContext'
import Layout from '../components/layout'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <AppContextWrapper>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppContextWrapper>
    </SessionProvider>
  )
}

export default MyApp
