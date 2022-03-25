import {
  ChangeEvent,
  Dispatch,
  RefObject,
  SetStateAction,
  useState
} from 'react'
import type { Customer, Sale, Item0 } from '../pages/plus'
import type { Xpense } from '../pages/minus'
import type { User } from '../pages/editUsers'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'

/** Arguments/Props for this Select component */
type SelectArgs = {
  items: Customer[] | User[] | Sale[] | Xpense[]
  currentItem: Customer | User | Sale | Xpense
  setCurrentItem: (anything: any) => void

  liveRef: RefObject<HTMLInputElement>
  searchWord: string
  setSearchWord: Dispatch<SetStateAction<string>>
  updateFunc?: () => void
  mode: string
  type: string
}
type T = SelectArgs['setCurrentItem']

const LiveSelect: React.FC<SelectArgs> = (a: SelectArgs) => {
  const [flagNew, setFlagNew] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newGooid, setNewGooid] = useState('')
  const [newTimeZone, setNewTimeZone] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newCust, setNewCust] = useState('')
  const [newProd, setNewProd] = useState('')
  const [newXitem, setNewXitem] = useState('')
  const [newSum, setNewSum] = useState('')
  let item0: SelectArgs['currentItem']
  let newTitle: string
  let apiName: string
  let body: {
    mode: string
    name?: string
    phone?: string
    gooid?: string
    timezone?: string
    date?: string
    cust?: string
    prod?: string
    xitem?: string
    sum?: string
  }

  switch (a.type) {
    case 'C': {
      item0 = { id: 0, name: '', phone: '', gooid: '' }
      apiName = 'customers'
      body = { mode: 'new', name: newName, phone: newPhone, gooid: newGooid }
      newTitle = 'Customer'
      break
    }
    case 'U': {
      item0 = { id: 0, name: '', phone: '', gooid: '', timezone: '' }
      apiName = 'users'
      body = {
        mode: 'new',
        name: newName,
        phone: newPhone,
        gooid: newGooid,
        timezone: newTimeZone
      }
      newTitle = 'User'
      break
    }
    case 'S': {
      item0 = { id: 0, date: '', cust: 0, prod: 0, sum: 0 }
      apiName = 'sales'
      body = {
        mode: 'new',
        date: newDate,
        cust: newCust,
        prod: newProd,
        sum: newSum
      }
      newTitle = 'Sale'
      break
    }
    case 'X': {
      item0 = { id: 0, date: '', xitem: 0, sum: 0 }
      apiName = 'xpenses'
      body = {
        mode: 'new',
        date: newDate,
        xitem: newXitem,
        sum: newSum
      }
      newTitle = 'Xpense'
      break
    }
    default: {
      console.log('LiveSelect !!! empty api.item type.')
      return <></>
    }
  }

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    a.setSearchWord(() => st)
    a.setCurrentItem(item0)
  }

  function dropHandler() {
    a.setSearchWord(() => '')
    if (a.liveRef.current !== null) a.liveRef.current.value = ''
    a.setCurrentItem(item0)
    setFlagNew(() => '')
    setNewName(() => '')
    setNewPhone(() => '')
    setNewGooid(() => '')
    setNewTimeZone(() => '')
    setNewDate(() => '')
    setNewCust(() => '')
    setNewProd(() => '')
    setNewXitem(() => '')
    setNewSum(() => '')
  }
  function newButtonHandler() {
    dropHandler()
    setFlagNew(() => 'Y')
  }
  function saveNewHandler() {
    switch (a.type) {
      case 'C': {
        if (newName === '' || newPhone === '') {
          alert('! empty field !')
          setFlagNew(() => '')
          return
        }
        break
      }
      case 'U': {
        if (newName === '' || newPhone === '' || newTimeZone === '') {
          alert('! empty field !')
          setFlagNew(() => '')
          return
        }
        break
      }
      case 'S': {
        if (
          newDate === '' ||
          newCust === '' ||
          newProd === '' ||
          newSum === ''
        ) {
          alert('! empty field !')
          setFlagNew(() => '')
          return
        }
        break
      }
      case 'X': {
        if (newDate === '' || newXitem === '' || newSum === '') {
          alert('! empty field !')
          setFlagNew(() => '')
          return
        }
        break
      }
      default: {
        alert('saveNew ! empty api.type !')
        return
      }
    }

    fetch('/api/' + apiName, {
      method: 'POST',
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log('--- saveNew DB/api error: ' + res.error)
          alert('DataBase error: X3')
        } else {
          if (!!a.updateFunc) a.updateFunc()
        }
      })
      .then(() => dropHandler())
  }

  function LiveSearchList() {
    if (a.searchWord === '' || (!!a.currentItem.id && a.currentItem.id > 0))
      return <></>
    let cList: any

    switch (a.type) {
      case 'C': {
        cList = (a.items as Customer[])
          .filter((item) => {
            return item.name.toLowerCase().includes(a.searchWord)
          })
          .map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setCurrC(item.id)}
                className={styles.csOpt}
              >
                {item.name}
              </div>
            )
          })
        break
      }
      case 'U': {
        cList = (a.items as User[])
          .filter((item) => {
            return item.name.toLowerCase().includes(a.searchWord)
          })
          .map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setCurrU(item.id)}
                className={styles.csOpt}
              >
                {item.name}
              </div>
            )
          })
        break
      }
      case 'S': {
        cList = (a.items as Sale[])
          .filter((item) => {
            return (
              String(item.id).includes(a.searchWord) ||
              String(item.cust).includes(a.searchWord) ||
              String(item.prod).includes(a.searchWord) ||
              item.date.toLowerCase().includes(a.searchWord)
            )
          })
          .map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setCurrS(item.id || 0)}
                className={styles.csOpt}
              >
                id={item.id}, c={item.cust}, p={item.prod}, sum={item.sum},{' '}
                {item.date}
              </div>
            )
          })
        break
      }
      case 'X': {
        cList = (a.items as Xpense[])
          .filter((item) => {
            return (
              String(item.id).includes(a.searchWord) ||
              item.date.toLowerCase().includes(a.searchWord) ||
              String(item.xitem).includes(a.searchWord)
            )
          })
          .map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => setCurrX(item.id || 0)}
                className={styles.csOpt}
              >
                id:{item.id}, xi={item.xitem}, sum={item.sum}, {item.date}
              </div>
            )
          })
        break
      }
      default: {
        console.log('LiveSearchList ! empty api.type !')
        return <></>
      }
    }

    if (cList.length === 0) return <> </>

    return (
      <div className={styles.floatWrapper}>
        <div className={styles.selectListForm}>
          <div className={styles.selectList}>{cList}</div>
        </div>
      </div>
    )
  }

  function setCurrC(currId: number) {
    type T3 = typeof a.setCurrentItem
    const st = (a.items as Customer[]).filter((item) => {
      return item.id === currId
    })
    if (st.length === 1 && a.liveRef.current !== null) {
      type T4 = typeof a.setCurrentItem
      const curr = st[0]
      a.liveRef.current.value = curr.name
      a.setCurrentItem({
        id: curr.id,
        name: curr.name,
        phone: curr.phone,
        gooid: curr.gooid
      })
    }
  }

  function setCurrU(currId: number) {
    const st = (a.items as User[]).filter((item) => {
      return item.id === currId
    })
    if (st.length === 1 && a.liveRef.current !== null) {
      const curr = st[0]
      a.liveRef.current.value = curr.name
      a.setCurrentItem({
        id: curr.id,
        name: curr.name,
        phone: curr.phone,
        gooid: curr.gooid,
        timezone: curr.timezone
      })
    }
  }

  function setCurrS(currId: number) {
    const st = (a.items as Sale[]).filter((item) => {
      return item.id === currId
    })
    if (st.length === 1 && a.liveRef.current !== null) {
      const curr = st[0]
      a.liveRef.current.value =
        'id=' +
        curr.id +
        ', c=' +
        curr.cust +
        ', p=' +
        curr.prod +
        ', sum=' +
        curr.sum +
        ', ' +
        curr.date
      a.setCurrentItem({
        id: curr.id,
        date: curr.date,
        cust: Number(curr.cust),
        prod: Number(curr.prod),
        sum: Number(curr.sum)
      })
    }
  }

  function setCurrX(currId: number) {
    const st = (a.items as Xpense[]).filter((item) => {
      return item.id === currId
    })
    if (st.length === 1 && a.liveRef.current !== null) {
      const curr = st[0]
      a.liveRef.current.value =
        'id=' +
        curr.id +
        ', x=' +
        curr.xitem +
        ', sum=' +
        curr.sum +
        ', ' +
        curr.date
      a.setCurrentItem({
        id: curr.id,
        date: curr.date,
        xitem: Number(curr.xitem),
        sum: Number(curr.sum)
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
          <p className={styles.title}>New {newTitle}</p>
          <p hidden={a.type !== 'C' && a.type !== 'U'}>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="Name"
              pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
              value={newName || ''}
              onChange={(event) =>
                setNewName(
                  event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, '')
                )
              }
            />
          </p>
          <p hidden={a.type !== 'C' && a.type !== 'U'}>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="+x xxx xxx xxxx, xxxx"
              pattern="^\+?[\d\s\-]{0,20}"
              value={newPhone || ''}
              onChange={(event) =>
                setNewPhone(event.target.value.replace(/[^\d\-\+\s]/g, ''))
              }
            />
          </p>
          <p hidden={a.type !== 'C' && a.type !== 'U'}>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="goo-id"
              pattern="^[\d\s\-]{0,20}"
              value={newGooid || ''}
              onChange={(event) =>
                setNewGooid(event.target.value.replace(/[^\d\-\+\s]/g, ''))
              }
            />
          </p>
          <p hidden={a.type !== 'U'}>
            Tzone:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="+xx"
              pattern="^\+?[\d\+\-]{0,3}"
              value={newTimeZone || ''}
              onChange={(event) =>
                setNewTimeZone(event.target.value.replace(/[^\d\-\+]/g, ''))
              }
            />
          </p>
          <p hidden={a.type !== 'S' && a.type !== 'X'}>
            Date:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="2022-02-02"
              pattern="[a-zA-Zа-яА-Я\s\-\d:\.]{1,50}"
              value={newDate || ''}
              onChange={(event) =>
                setNewDate(
                  event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s\d:\.]/gi, '')
                )
              }
            />
          </p>
          <p hidden={a.type !== 'S'}>
            {' '}
            Cust:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="xxxx"
              pattern="^[\d]{0,20}"
              value={newCust || ''}
              onChange={(event) =>
                setNewCust(event.target.value.replace(/[^\d]/g, ''))
              }
            />
          </p>
          <p hidden={a.type !== 'S'}>
            Prod:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="xxxx"
              pattern="^[\d]{0,20}"
              value={newProd || ''}
              onChange={(event) =>
                setNewProd(event.target.value.replace(/[^\d]/g, ''))
              }
            />
          </p>
          <p hidden={a.type !== 'X'}>
            X-item:
            <input
              type="text"
              className={styles.userInput}
              placeholder="xxxx"
              pattern="^[\d]{0,20}"
              value={newXitem || ''}
              onChange={(event) =>
                setNewXitem(event.target.value.replace(/[^\d]/g, ''))
              }
            />
          </p>
          <p hidden={a.type !== 'S' && a.type !== 'X'}>
            Sum:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="xxxx"
              pattern="^[\d]{0,20}"
              value={newSum || ''}
              onChange={(event) =>
                setNewSum(event.target.value.replace(/[^\d]/g, ''))
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

export default LiveSelect
