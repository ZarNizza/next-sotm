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
import { error } from 'console'

interface CustSelectProps {
  customers: Customer[]
  setCurrentCustomer: Dispatch<SetStateAction<[number, string]>>
  currentCustomer: [number, string]
  setCustomers: Dispatch<SetStateAction<Customer[]>>
  mode: string
}

export default function CustomerSelect(props: CustSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const customerInputRef = useRef<HTMLInputElement>(null)
  const csResultsList = document.getElementById('cSearchResultsList')
  const [flagNewCustomer, setFlagNewCustomer] = useState('')
  const [newCust, setNewCust] = useState('')
  const [newPhone, setNewPhone] = useState('')

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

  function newButtonHandler() {
    setFlagNewCustomer(() => 'Y')
  }
  function saveNewHandler() {
    return new Promise((resolveSS, rejectSS) => {
      const cust = { cname: newCust, cphone: newPhone }
      fetch('/api/customers', {
        method: 'POST',
        body: JSON.stringify(cust)
      })
        .then((res) => res.json())
        .then((res) => {
          console.log('Add: addCustomer = OK', res)
          resolveSS(res)
        })
        .catch((error) => {
          console.log('! Add: addCustomer error - ', error.message)
          rejectSS(error)
        })
    })
      .then(() => {
        new Promise((resolveUC, rejectUC) => {
          fetch('/api/customers')
            .then((apiRes) => apiRes.json())
            .then((apiRes: { data: Customer[] }) => {
              props.setCustomers(() => apiRes.data || [])
              console.log('Customers api res.data:', apiRes.data)
              resolveUC(apiRes)
            })
            .catch((error) => {
              console.log('! frontend update Customers error - ', error.message)
              rejectUC(error)
            })
        })
      })
      .then(() => {
        setNewCust(() => '')
        setNewPhone(() => '')
        setFlagNewCustomer(() => '')
      })
      .catch()
  }

  function cancelNewHandler() {
    setNewCust(() => '')
    setNewPhone(() => '')
    setFlagNewCustomer(() => '')
  }

  return (
    <>
      <div className={styles.custList}>
        <p className={styles.title}>Customer</p>
        <button
          onClick={newButtonHandler}
          className={stylesH.plusButton}
          hidden={props.mode === 'stat'}
        >
          +New
        </button>
        <input
          type="search"
          ref={customerInputRef}
          placeholder="Search for a Customer"
          pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
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

      <div className={styles.floatWrapper} hidden={flagNewCustomer === ''}>
        <div className={styles.newCust}>
          <p className={styles.title}>New Customer</p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="Name"
              pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
              value={newCust}
              onChange={(event) =>
                setNewCust(
                  event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, '')
                )
              }
            />
          </p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="+x xxx xxx xxxx, xxxx"
              pattern="^\+?[\d\s\-]{0,20}"
              value={newPhone}
              onChange={(event) =>
                setNewPhone(event.target.value.replace(/[^\d\-\+\s]/g, ''))
              }
            />
          </p>
          <p>
            <button onClick={saveNewHandler} className={stylesH.sysButton}>
              Save
            </button>
            <button onClick={cancelNewHandler} className={stylesH.sysButton}>
              Cancel
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
