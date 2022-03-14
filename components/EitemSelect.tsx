import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from 'react'
import type { Eitem } from '../pages/minus'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'

type EitemSelectProps = {
  eItems: Eitem[]
  setCurrentEitem: Dispatch<SetStateAction<Eitem>>
  currentEitem: Eitem
  setEitems: Dispatch<SetStateAction<Eitem[] | []>>
  mode: string
}

export default function EitemSelect(props: EitemSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const eItemInputRef = useRef<HTMLInputElement>(null)
  const [flagNewEitem, setFlagNewEitem] = useState('')
  const [newEname, setNewEname] = useState('')
  const [newEsymbol, setNewEsymbol] = useState('')

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    setSearchTerm(() => st)
    props.setCurrentEitem({ eid: 0, ename: '', esymbol: '' })
  }

  function liveST(e: ChangeEvent<HTMLSelectElement>) {
    const indexST = e.target.value
    const st = props.eItems.filter((item: Eitem) => {
      return item.eid === Number(indexST)
    })
    if (st.length === 1 && eItemInputRef.current !== null) {
      const curr = st[0]
      eItemInputRef.current.value = curr.ename
      props.setCurrentEitem({
        eid: Number(curr.eid),
        ename: curr.ename,
        esymbol: curr.esymbol
      })
    }
  }

  function dropButtonHandler() {
    setSearchTerm(() => '')
    if (eItemInputRef.current !== null) eItemInputRef.current.value = ''
    props.setCurrentEitem({ eid: 0, ename: '', esymbol: '' })
  }

  function newButtonHandler() {
    setFlagNewEitem(() => 'Y')
  }
  function saveNewHandler() {
    return new Promise((resolveSS, rejectSS) => {
      const body = { mode: 'new', ename: newEname, esymbol: newEsymbol }
      fetch('/api/eitems', {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log('--- saveNew-E DB/api error: ' + res.error)
            alert('DataBase error: X3')
            rejectSS(res.error)
          } else {
            resolveSS(res)
          }
        })
        .catch((error) => {
          console.log('--- catch saveNew-E fetch error - ', error)
          alert('fetch data error: X3')
        })
    })
      .then(() => {
        new Promise((resolveUC, rejectUC) => {
          fetch('/api/eitems')
            .then((apiRes) => apiRes.json())
            .then((apiRes) => {
              if (apiRes.error) {
                console.log('--- E-Select DB/api error: ' + apiRes.error)
                alert('DataBase error: X3')
                rejectUC(apiRes.error)
              } else {
                props.setEitems(() => apiRes.data || [])
                resolveUC(apiRes)
              }
            })
            .catch((error) => {
              console.log('--- catch E-Select fetch error - ', error)
              alert('fetch data error: X3')
            })
        })
      })
      .then(() => {
        setNewEname(() => '')
        setNewEsymbol(() => '')
        setFlagNewEitem(() => '')
      })
      .catch()
  }

  function cancelNewHandler() {
    setNewEname(() => '')
    setNewEsymbol(() => '')
    setFlagNewEitem(() => '')
  }

  function SearchResultsList() {
    let iList = props.eItems
      .filter((item: Eitem) => {
        return item.ename.toLowerCase().includes(searchTerm)
      })
      .map((item: Eitem) => {
        return (
          <option value={item.eid} key={item.eid}>
            {item.ename}
          </option>
        )
      })
    return (
      <select onChange={liveST} size={4}>
        {iList}
      </select>
    )
  }

  return (
    <>
      <div className={styles.custList}>
        {/* <p className={styles.title}>Eitem</p> */}
        <input
          type="search"
          ref={eItemInputRef}
          placeholder="Search for a Eitem"
          pattern="[a-zA-Zа-яА-Я\s\-\+]{1,50}"
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
        hidden={searchTerm === '' || props.currentEitem.eid > 0}
      >
        <div className={styles.custSelect}>
          <SearchResultsList />
        </div>
      </div>

      <div className={styles.floatWrapper} hidden={flagNewEitem === ''}>
        <div className={styles.newCust}>
          <p className={styles.title}>New Eitem</p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="Name"
              pattern="[a-zA-Zа-яА-Я\s\-\+]{1,50}"
              value={newEname}
              onChange={(event) =>
                setNewEname(
                  event.target.value.replace(/[^a-zA-Zа-яА-Я\-\+\s]/gi, '')
                )
              }
            />
          </p>
          <p>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="up to 7 symbols"
              pattern="[a-zA-Zа-яА-Я\d\s\-\+\.,:]*"
              value={newEsymbol}
              onChange={(event) =>
                setNewEsymbol(
                  event.target.value.replace(
                    /[^a-zA-Zа-яА-Я\d\s\-\+\.\,\:\_]/gi,
                    ''
                  )
                )
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
