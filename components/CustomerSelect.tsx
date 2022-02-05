import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import type { Customer } from '../pages/add'
import styles from './CustomerSelect.module.scss'

interface CustSelectProps {
  customers: Customer[]
  setCurrentCustomer: Dispatch<SetStateAction<[number, string]>>
  currentCustomer: [number, string]
}

export default function CustomerSelect(props: CustSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const csInput = document.getElementById(
    'cSearchInput'
  ) as HTMLInputElement | null
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
      props.setCurrentCustomer(() => [Number(st[0].cid), st[0].cname])
      if (csInput !== null) csInput.value = st[0].cname
    }
  }

  return (
    <>
      <div className={styles.custList}>
        <p className={styles.title}>Customer</p>
        <input
          type="search"
          id="cSearchInput"
          placeholder="Search for a Customer"
          onChange={liveSearch}
          className={styles.inputCust}
        />
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
