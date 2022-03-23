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
  items: Customer[]
  currentItem: Customer
  setCurrentItem: Dispatch<SetStateAction<Customer>>
  liveRef: RefObject<HTMLInputElement>
  searchWord: string
  setSearchWord: Dispatch<SetStateAction<string>>
  updateFunc?: any
  mode: string
}

export default function CustomerSelect(a: CustSelectProps) {
  const [flagNew, setFlagNew] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  let item0 = { id: 0, name: '', phone: '', gooid: '' }

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    a.setSearchWord(() => st)
    a.setCurrentItem(item0)
  }

  function dropHandler() {
    a.setSearchWord(() => '')
    if (a.liveRef.current !== null) a.liveRef.current.value = ''
    a.setCurrentItem(item0)
    setNewName(() => '')
    setNewPhone(() => '')
    setFlagNew(() => '')
  }
  function newButtonHandler() {
    dropHandler()
    setFlagNew(() => 'Y')
  }
  function saveNewHandler() {
    if (newName === '' || newPhone === '') {
      alert('! empty field !')
      setFlagNew(() => '')
      return
    }
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
        } else {
          if (!!a.updateFunc()) a.updateFunc()
        }
      })
      .then(() => dropHandler())
  }

  function LiveSearchList() {
    if (a.searchWord === '' || a.currentItem.id > 0) return <></>

    let cList = a.items
      .filter((item: Customer) => {
        return item.name.toLowerCase().includes(a.searchWord)
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
    const st = a.items.filter((item: Customer) => {
      return item.id === Number(id)
    })
    if (st.length === 1 && a.liveRef.current !== null) {
      const curr = st[0]
      a.liveRef.current.value = curr.name
      a.setCurrentItem({
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
          ref={a.liveRef}
          placeholder="Customer name"
          pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
          onChange={liveSearch}
          className={styles.inputCust}
        />
        <button
          onClick={newButtonHandler}
          className={stylesH.plusButton}
          hidden={a.mode === 'stat'}
        >
          +New
        </button>
        <button onClick={dropHandler} className={stylesH.dropButton}>
          X
        </button>
      </div>

      <LiveSearchList />

      <div className={styles.floatWrapper} hidden={flagNew === ''}>
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
