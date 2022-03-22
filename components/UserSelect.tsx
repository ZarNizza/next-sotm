import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import type { User } from '../pages/editUsers'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'

type UserSelectProps = {
  users: User[]
  setCurrentUser: Dispatch<SetStateAction<User>>
  currentUser: User
  setUsers: Dispatch<SetStateAction<User[] | []>>
  mode: string
}

export default function UserSelect(props: UserSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const userInputRef = useRef<HTMLInputElement>(null)
  const [flagNewUser, setFlagNewUser] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newTimeZone, setNewTimeZone] = useState('')

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    setSearchTerm(() => st)
    props.setCurrentUser({
      id: 0,
      name: '',
      phone: '',
      gooid: '',
      timezone: ''
    })
  }

  function liveST(e: ChangeEvent<HTMLSelectElement>) {
    const indexST = e.target.value
    const st = props.users.filter((item: User) => {
      return item.id === Number(indexST)
    })
    if (st.length === 1 && userInputRef.current !== null) {
      const curr = st[0]
      userInputRef.current.value = curr.name
      props.setCurrentUser({
        id: Number(curr.id),
        name: curr.name,
        phone: curr.phone,
        gooid: curr.gooid,
        timezone: ''
      })
    }
  }

  function dropButtonHandler() {
    setSearchTerm(() => '')
    if (userInputRef.current !== null) userInputRef.current.value = ''
    props.setCurrentUser({
      id: 0,
      name: '',
      phone: '',
      gooid: '',
      timezone: ''
    })
  }

  function newButtonHandler() {
    setFlagNewUser(() => 'Y')
  }
  function saveNewHandler() {
    if (newName === '' || newPhone === '') {
      alert('! empty field !')
      setFlagNewUser(() => '')
      return
    }
    return new Promise((resolveSS, rejectSS) => {
      const body = {
        mode: 'new',
        name: newName,
        phone: newPhone,
        timezone: newTimeZone
      }
      fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log('--- saveNew U DB/api error: ' + res.error)
            alert('DataBase error: X3')
            rejectSS(res.error)
          } else {
            resolveSS(res)
          }
        })
        .catch((error) => {
          console.log('--- catch saveNew U fetch error - ', error)
          alert('fetch data error: X3')
        })
    })
      .then(() => {
        new Promise((resolveUC, rejectUC) => {
          fetch('/api/users')
            .then((apiRes) => apiRes.json())
            .then((apiRes) => {
              if (apiRes.error) {
                console.log('--- U-Select DB/api error: ' + apiRes.error)
                alert('DataBase error: X3')
                rejectUC(apiRes.error)
              } else {
                props.setUsers(() => apiRes.data || [])
                resolveUC(apiRes)
              }
            })
            .catch((error) => {
              console.log('--- catch U-Select fetch error - ', error)
              alert('fetch data error: X3')
            })
        })
      })
      .then(() => {
        setNewName(() => '')
        setNewPhone(() => '')
        setFlagNewUser(() => '')
      })
      .catch()
  }

  function cancelNewHandler() {
    setNewName(() => '')
    setNewPhone(() => '')
    setFlagNewUser(() => '')
  }

  function CLSresList() {
    let cList = props.users
      .filter((item: User) => {
        return item.name.toLowerCase().includes(searchTerm)
      })
      .map((item: User) => {
        return (
          <option value={item.id} key={item.id}>
            {item.name}
          </option>
        )
      })
    return (
      <select onChange={liveST} size={4}>
        {cList}
      </select>
    )
  }

  return (
    <>
      <div className={styles.custList}>
        {/* <p className={styles.title}>User</p> */}
        <input
          type="search"
          ref={userInputRef}
          placeholder="Search for a User"
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
      <div
        className={styles.floatWrapper}
        hidden={searchTerm === '' || props.currentUser.id > 0}
      >
        <div className={styles.custSelect}>
          <CLSresList />
        </div>
      </div>

      <div className={styles.floatWrapper} hidden={flagNewUser === ''}>
        <div className={styles.newCust}>
          <p className={styles.title}>New User</p>
          <p>
            Name:
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
            Phone:
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
            TimeZ:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="+xx"
              pattern="^\+?[\d\+\-]{0,3}"
              value={newTimeZone}
              onChange={(event) =>
                setNewTimeZone(event.target.value.replace(/[^\d\-\+]/g, ''))
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
