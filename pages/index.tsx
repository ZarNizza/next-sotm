import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import WelcomeHome from '../components/WelcomeHome'
import InitNewDB from '../components/InitNewDB'
import NobodyHome from '../components/NobodyHome'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const c = useContext(AppContext)
  console.log('index - c.u="', c.u, '"')

  if (!!c.u) {
    try {
      const cuC = c.u + 'customers'
      console.log(
        'index - locStor():',
        '\nC:',
        !!localStorage.getItem(c.u + 'customers'),
        localStorage.getItem(c.u + 'customers'),
        '\nP:',
        !!localStorage.getItem(c.u + 'prod'),
        localStorage.getItem(c.u + 'prod'),
        '\nS:',
        !!localStorage.getItem(c.u + 'sales'),
        localStorage.getItem(c.u + 'sales'),
        '\nE:',
        !!localStorage.getItem(c.u + 'eitems'),
        localStorage.getItem(c.u + 'eitems'),
        '\nX:',
        !!localStorage.getItem(c.u + 'xpenses'),
        localStorage.getItem(c.u + 'xpenses')
      )

      if (
        !!!localStorage.getItem(c.u + 'customers') ||
        !!!localStorage.getItem(c.u + 'prod') ||
        !!!localStorage.getItem(c.u + 'sales') ||
        !!!localStorage.getItem(c.u + 'eitems') ||
        !!!localStorage.getItem(c.u + 'xpenses')
      )
        throw null
    } catch {
      console.log('index - catch - go to InitNewDB')
      InitNewDB()
    }
  }

  // return session ? <WelcomeHome /> : <NobodyHome />;
  return <WelcomeHome />
}

export default Home
