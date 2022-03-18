import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import type { Customer } from '../pages/plus'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'

type CustSelectProps = {
  customers: Customer[]
  setCurrentCustomer: Dispatch<SetStateAction<Customer>>
  currentCustomer: Customer
  setCustomers: Dispatch<SetStateAction<Customer[] | []>>
  mode: string
}

export default function CustomerSelect(props: CustSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const customerInputRef = useRef<HTMLInputElement>(null)
  const [flagNewCustomer, setFlagNewCustomer] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    setSearchTerm(() => st)
    props.setCurrentCustomer({ cid: 0, cname: '', cphone: '', gooid: '' })
  }

  function liveST(e: ChangeEvent<HTMLSelectElement>) {
    const indexST = e.target.value
    const st = props.customers.filter((item: Customer) => {
      return item.cid === Number(indexST)
    })
    if (st.length === 1 && customerInputRef.current !== null) {
      const curr = st[0]
      customerInputRef.current.value = curr.cname
      props.setCurrentCustomer({
        cid: Number(curr.cid),
        cname: curr.cname,
        cphone: curr.cphone,
        gooid: curr.gooid
      })
    }
  }

  function dropButtonHandler() {
    setSearchTerm(() => '')
    if (customerInputRef.current !== null) customerInputRef.current.value = ''
    props.setCurrentCustomer({ cid: 0, cname: '', cphone: '', gooid: '' })
  }

  function newButtonHandler() {
    setFlagNewCustomer(() => 'Y')
  }
  function saveNewHandler() {
    if (newName === '' || newPhone === '') {
      alert('! empty field !')
      setFlagNewCustomer(() => '')
      return
    }
    return new Promise((resolveSS, rejectSS) => {
      const body = { mode: 'new', cname: newName, cphone: newPhone }
      fetch('/api/customers', {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log('--- saveNew DB/api error: ' + res.error)
            alert('DataBase error: X3')
            rejectSS(res.error)
          } else {
            resolveSS(res)
          }
        })
        .catch((error) => {
          console.log('--- catch saveNew fetch error - ', error)
          alert('fetch data error: X3')
        })
    })
      .then(() => {
        new Promise((resolveUC, rejectUC) => {
          fetch('/api/customers')
            .then((apiRes) => apiRes.json())
            .then((apiRes) => {
              if (apiRes.error) {
                console.log('--- CustSelect DB/api error: ' + apiRes.error)
                alert('DataBase error: X3')
                rejectUC(apiRes.error)
              } else {
                props.setCustomers(() => apiRes.data || [])
                resolveUC(apiRes)
              }
            })
            .catch((error) => {
              console.log('--- catch CustSelect fetch error - ', error)
              alert('fetch data error: X3')
            })
        })
      })
      .then(() => {
        setNewName(() => '')
        setNewPhone(() => '')
        setFlagNewCustomer(() => '')
      })
      .catch()
  }

  function cancelNewHandler() {
    setNewName(() => '')
    setNewPhone(() => '')
    setFlagNewCustomer(() => '')
  }

  function CLSresList() {
    let cList = props.customers
      .filter((item: Customer) => {
        return item.cname.toLowerCase().includes(searchTerm)
      })
      .map((item: Customer) => {
        return (
          <option value={item.cid} key={item.cid}>
            {item.cname}
          </option>
        )
      })
    if (cList.length === 0) return <></>
    return (
      <div
        className={styles.floatWrapper}
        hidden={searchTerm === '' || props.currentCustomer.cid > 0}
      >
        <div className={styles.custSelect}>
          <select onChange={liveST} size={4}>
            {cList}
          </select>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.custList}>
        {/* <p className={styles.title}>Customer</p> */}
        <input
          type="search"
          ref={customerInputRef}
          placeholder="Select Customer"
          pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
          onChange={liveSearch}
          className={styles.inputCust}
        />
        <button
          onClick={newButtonHandler}
          className={stylesH.plusButton}
          hidden={props.mode === 'stat'}
        >
          +New
        </button>
        <button onClick={dropButtonHandler} className={stylesH.dropButton}>
          X
        </button>
      </div>
      <CLSresList />

      <div className={styles.floatWrapper} hidden={flagNewCustomer === ''}>
        <div className={styles.newCust}>
          <p className={styles.title}>New Customer</p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="Name"
              pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
              value={newName}
              onChange={(event) =>
                setNewName(
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
