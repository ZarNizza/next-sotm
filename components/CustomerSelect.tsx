import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import type { Customer } from '../pages/add'
import styles from './CustomerSelect.module.scss'
import stylesH from '../styles/Home.module.css'

interface CustSelectProps {
  customers: Customer[]
  setCurrentCustomer: Dispatch<SetStateAction<[number, string]>>
  currentCustomer: [number, string]
}

export default function CustomerSelect(props: CustSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const customerInputRef = useRef<HTMLInputElement>(null)
  const csResultsList = document.getElementById('cSearchResultsList')

  useEffect(() => {
    if (csResultsList !== null) {
      csResultsList.innerHTML = ''
      props.customers
        .filter((item: Customer) => {
          return item.cname.toLowerCase().includes(searchTerm)
        })
        .forEach((item: Customer) => {
          const opt = new Option(item.cname, String(item.cid))
          csResultsList.appendChild(opt)
        })
    }
  }, [searchTerm])

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    setSearchTerm(() => st)
    props.setCurrentCustomer(() => [0, ''])
  }

  function liveST(e: ChangeEvent<HTMLSelectElement>) {
    const indexST = e.target.value
    const st = props.customers.filter((item: Customer) => {
      return item.cid === Number(indexST)
    })
    if (st.length === 1) {
      if (customerInputRef.current !== null)
        customerInputRef.current.value = st[0].cname
      props.setCurrentCustomer(() => [Number(st[0].cid), st[0].cname])
    }
  }

  function dropButtonHandler() {
    setSearchTerm(() => '')
    if (customerInputRef.current !== null) customerInputRef.current.value = ''
    props.setCurrentCustomer(() => [0, ''])
  }

  return (
    <>
      <div className={styles.custList}>
        <p className={styles.title}>Customer</p>
        <input
          type="search"
          ref={customerInputRef}
          placeholder="Search for a Customer"
          onChange={liveSearch}
          className={styles.inputCust}
        />
        <button onClick={dropButtonHandler} className={stylesH.dropButton}>
          X
        </button>
      </div>
      <div
        className={styles.floatWrapper}
        hidden={searchTerm === '' || props.currentCustomer[0] > 0}
      >
        <div className={styles.custSelect}>
          <select id="cSearchResultsList" size={4} onChange={liveST}></select>
        </div>
      </div>
    </>
  )
}
