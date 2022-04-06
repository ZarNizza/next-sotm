import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import WelcomeHome from '../components/WelcomeHome'
import NobodyHome from '../components/NobodyHome'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

const Home: NextPage = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const t = router.locale === 'en' ? en : ru
  // return session ? <WelcomeHome /> : <NobodyHome />;
  return <WelcomeHome t={t} />
}

export default Home
