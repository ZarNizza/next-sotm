import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import Layout from '../components/layout'
import MyContext from '../components/context'

import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MyContext>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </MyContext>
    </SessionProvider>
  )
}

export default MyApp
