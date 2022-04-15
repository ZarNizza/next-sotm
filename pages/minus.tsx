import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import Init from '../components/Init'
import EitemStore from '../components/EitemStore'
import XpenseCart from '../components/XpenseCart'
import EitemNew from '../components/EitemNew'
import { Toaster } from 'react-hot-toast'
import { AppContext } from '../components/AppContext'
import { useContext } from 'react'

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
  num: number
}

const Home: NextPage = () => {
  const c = useContext(AppContext)
  const [eItems, setEitems] = useState<Eitem[]>([])
  const [selectedEitems, setSelectedEitems] = useState<Eitem['id'][]>([])
  const eCostRef = useRef<Record<Eitem['id'], number>>({})
  const eNumRef = useRef<Record<Eitem['id'], number>>({})
  const [gross, setGross] = useState<number>(0)
  const [newFlag, setNewFlag] = useState(false)

  useEffect(() => {
    Init(setEitems, 'eitems', c.u)
  }, [])

  type SumProps = { id: number; value: number }

  const inputSumCh_Handler: React.FC<SumProps> = ({ id, value }) => {
    console.log('minus Sum - id:', typeof id, id, typeof value, value)
    eCostRef.current[id] = value
    setGross(
      Object.values(eCostRef.current).reduce((prev, curr) => prev + curr, 0)
    )
    return null
  }

  const inputNumCh_Handler: React.FC<SumProps> = ({ id, value }) => {
    console.log('minus Num - id:', typeof id, id, typeof value, value)
    eNumRef.current[id] = value
    return null
  }

  const dropButton_Handler: React.FC<number> = (id) => {
    delete eCostRef.current[id]
    delete eNumRef.current[id]
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
        <title>{c.t.minusTitle}</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h1>{c.t.cost}</h1>
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
            eNumRef={eNumRef}
            setGross={setGross}
            setNewFlag={setNewFlag}
          />{' '}
          <XpenseCart
            setSelectedEitems={setSelectedEitems}
            selectedEitems={selectedEitems}
            eItems={eItems}
            eCostRef={eCostRef}
            eNumRef={eNumRef}
            gross={gross}
            setGross={setGross}
            inputSumChangeHandler={inputSumCh_Handler}
            inputNumChangeHandler={inputNumCh_Handler}
            dropButton_Handler={dropButton_Handler}
          />
        </div>
      </main>
    </>
  )
}

export default Home
