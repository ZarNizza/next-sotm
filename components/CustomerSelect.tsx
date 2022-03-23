import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
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
  liveRef: RefObject<HTMLInputElement>
  searchWord: string
  setSearchWord: Dispatch<SetStateAction<string>>
  flagNew: string
  setFlagNew: Dispatch<SetStateAction<string>>
  mode: string
}

export default function CustomerSelect(arg: CustSelectProps) {
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    arg.setSearchWord(() => st)
    arg.setCurrentCustomer({ id: 0, name: '', phone: '', gooid: '' })
  }

  function dropHandler() {
    arg.setSearchWord(() => '')
    if (arg.liveRef.current !== null) arg.liveRef.current.value = ''
    arg.setCurrentCustomer({ id: 0, name: '', phone: '', gooid: '' })
    setNewName(() => '')
    setNewPhone(() => '')
    arg.setFlagNew(() => '')
  }
  function newButtonHandler() {
    dropHandler()
    arg.setFlagNew(() => 'Y')
  }
  function saveNewHandler() {
    if (newName === '' || newPhone === '') {
      alert('! empty field !')
      arg.setFlagNew(() => '')
      return
    }
    return new Promise((resolveNew, rejectNew) => {
      const body = { mode: 'new', name: newName, phone: newPhone }
      fetch('/api/customers', {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log('--- saveNew DB/api error: ' + res.error)
            alert('DataBase error: X3')
            rejectNew(res.error)
          } else {
            resolveNew(res)
          }
        })
        .catch((error) => {
          console.log('--- catch saveNew fetch error - ', error)
          alert('fetch data error: X3')
        })
    })
      .then(() => {
        new Promise((resolveUpd, rejectUpd) => {
          fetch('/api/customers')
            .then((apiRes) => apiRes.json())
            .then((apiRes) => {
              if (apiRes.error) {
                console.log('--- CustSelect DB/api error: ' + apiRes.error)
                alert('DataBase error: X3')
                rejectUpd(apiRes.error)
              } else {
                arg.setCustomers(() => apiRes.data || [])
                resolveUpd(apiRes)
              }
            })
            .catch((error) => {
              console.log('--- catch CustSelect fetch error - ', error)
              alert('fetch data error: X3')
            })
        })
      })
      .then(() => dropHandler())
      .catch()
  }

  function LiveSearchList() {
    if (arg.searchWord === '' || arg.currentCustomer.id > 0) return <></>

    let cList = arg.customers
      .filter((item: Customer) => {
        return item.name.toLowerCase().includes(arg.searchWord)
      })
      .map((item: Customer) => {
        return (
          <div
            key={item.id}
            onClick={() => setCurr(item.id)}
            className={styles.csOpt}
          >
            {item.name}
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

  function setCurr(id: any) {
    const st = arg.customers.filter((item: Customer) => {
      return item.id === Number(id)
    })
    if (st.length === 1 && arg.liveRef.current !== null) {
      const curr = st[0]
      arg.liveRef.current.value = curr.name
      arg.setCurrentCustomer({
        id: Number(curr.id),
        name: curr.name,
        phone: curr.phone,
        gooid: curr.gooid
      })
    }
  }

  return (
    <>
      <div className={styles.custList}>
        <input
          type="search"
          ref={arg.liveRef}
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
        <button onClick={dropHandler} className={stylesH.dropButton}>
          X
        </button>
      </div>

      <LiveSearchList />

      <div className={styles.floatWrapper} hidden={arg.flagNew === ''}>
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
            <button onClick={dropHandler} className={stylesH.sysButton}>
              Cancel
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
