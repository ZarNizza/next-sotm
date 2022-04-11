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

  if (!!c.u && !localStorage.getItem('users')) InitNewDB()
  // return session ? <WelcomeHome /> : <NobodyHome />;
  return <WelcomeHome />
}

export default Home
