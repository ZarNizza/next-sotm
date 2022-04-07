import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Init from '../components/Init'
import EitemStore from '../components/EitemStore'
import XpenseCart from '../components/XpenseCart'
import EitemNew from '../components/EitemNew'
import { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

export type Eitem = {
  id: number
  name: string
  symbol: string
  price: number
}
export type Xpense = {
  id?: number
  date: string
  xitem: number
  sum: number
}

const Home: NextPage = () => {
  const t = useRouter().locale === 'en' ? en : ru
  const [eItems, setEitems] = useState<Eitem[]>([])
  const [selectedEitems, setSelectedEitems] = useState<Eitem['id'][]>([])
  const eCostRef = useRef<Record<Eitem['id'], number>>({})
  const [gross, setGross] = useState<number>(0)
  const [newFlag, setNewFlag] = useState(false)

  useEffect(() => {
    Init(setEitems, 'eitems')
  }, [])

  type SumProps = { id: number; value: number }

  const inputSumCh_Handler: React.FC<SumProps> = ({ id, value }) => {
    console.log('minus - id:', typeof id, id, typeof value, value)
    eCostRef.current[id] = value
    setGross(
      Object.values(eCostRef.current).reduce((prev, curr) => prev + curr, 0)
    )
    return null
  }

  const dropButton_Handler: React.FC<number> = (id) => {
    delete eCostRef.current[id]
    setGross(
      Object.values(eCostRef.current).reduce((prev, curr) => prev + curr, 0)
    )
    setSelectedEitems((prevSelectedEitems) => {
      return prevSelectedEitems.filter((eItem) => eItem !== Number(id))
    })
    return null
  }

  return (
    <>
      <Head>
        <title>{t.minusTitle}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h1>{t.cost}</h1>
          <Toaster />
          {newFlag ? (
            <EitemNew setItems={setEitems} setNewFlag={setNewFlag} />
          ) : (
            ''
          )}
          <p> </p>
          <EitemStore
            eItems={eItems}
            setSelectedEitems={setSelectedEitems}
            selectedEitems={selectedEitems}
            eCostRef={eCostRef}
            setGross={setGross}
            setNewFlag={setNewFlag}
          />{' '}
          <XpenseCart
            setSelectedEitems={setSelectedEitems}
            selectedEitems={selectedEitems}
            eItems={eItems}
            eCostRef={eCostRef}
            gross={gross}
            setGross={setGross}
            inputSumChangeHandler={inputSumCh_Handler}
            dropButton_Handler={dropButton_Handler}
          />
        </div>
      </main>
    </>
  )
}

export default Home
