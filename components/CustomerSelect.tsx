import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState
} from 'react'
import type { Customer } from '../pages/plus'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'

type CustSelectProps = {
  customers: Customer[]
  setCustomers: Dispatch<SetStateAction<Customer[] | []>>
  currentCustomer: Customer
  setCurrentCustomer: Dispatch<SetStateAction<Customer>>
  mode: string
}

export default function CustomerSelect(arg: CustSelectProps) {
  const [searchWord, setSearchWord] = useState('')
  const customerInputRef = useRef<HTMLInputElement>(null)
  const [flagNewCustomer, setFlagNewCustomer] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    // if (st.length < 3) return
    setSearchWord(() => st)
    arg.setCurrentCustomer({ cid: 0, cname: '', cphone: '', gooid: '' })
  }

  function dropButtonHandler() {
    setSearchWord(() => '')
    if (customerInputRef.current !== null) customerInputRef.current.value = ''
    arg.setCurrentCustomer({ cid: 0, cname: '', cphone: '', gooid: '' })
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
                arg.setCustomers(() => apiRes.data || [])
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

  function LiveSearchList() {
    if (searchWord === '' || arg.currentCustomer.cid > 0) return <></>

    let cList = arg.customers
      .filter((item: Customer) => {
        return item.cname.toLowerCase().includes(searchWord)
      })
      .map((item: Customer) => {
        return (
          <div
            key={item.cid}
            onClick={() => setCurr(item.cid)}
            className={styles.csOpt}
          >
            {item.cname}
          </div>
        )
      })

    if (cList.length === 0) return <></>

    return (
      <div className={styles.floatWrapper}>
        <div className={styles.selectListForm}>
          <div className={styles.selectList}>{cList}</div>
        </div>
      </div>
    )
  }

  function setCurr(eid: any) {
    const st = arg.customers.filter((item: Customer) => {
      return item.cid === Number(eid)
    })
    if (st.length === 1 && customerInputRef.current !== null) {
      const curr = st[0]
      customerInputRef.current.value = curr.cname
      arg.setCurrentCustomer({
        cid: Number(curr.cid),
        cname: curr.cname,
        cphone: curr.cphone,
        gooid: curr.gooid
      })
    }
  }

  function NewForm() {
    if (flagNewCustomer === '') return <></>
    return (
      <div className={styles.floatWrapper}>
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
          <p className={styles.flexRow}>
            <button onClick={saveNewHandler} className={stylesH.sysButton}>
              Save
            </button>
            <button onClick={cancelNewHandler} className={stylesH.sysButton}>
              Cancel
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className={styles.custList}>
        <input
          type="search"
          ref={customerInputRef}
          placeholder="Customer name"
          pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
          onChange={liveSearch}
          className={styles.inputCust}
        />
        <button
          onClick={newButtonHandler}
          className={stylesH.plusButton}
          hidden={arg.mode === 'stat'}
        >
          +New
        </button>
        <button onClick={dropButtonHandler} className={stylesH.dropButton}>
          X
        </button>
      </div>
      <LiveSearchList />
      <NewForm />
    </>
  )
}
