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
import { AppContext } from './AppContext'
import { useContext } from 'react'

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
  const c = useContext(AppContext)
  const [flagNew, setFlagNew] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newGooid, setNewGooid] = useState('')
  const [newMD5, setNewMD5] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newCust, setNewCust] = useState('')
  const [newProd, setNewProd] = useState('')
  const [newXitem, setNewXitem] = useState('')
  const [newSum, setNewSum] = useState('')
  const [newSumD, setNewSumD] = useState('')
  let item0: SelectArgs['currentItem']
  let newTitle: string
  let apiName: string
  let body: {
    mode: string
    dbPrefix: string
    name?: string
    phone?: string
    gooid?: string
    md5?: string
    date?: string
    cust?: string
    prod?: string
    xitem?: string
    sum?: string
    sumd?: string
  }

  switch (a.type) {
    case 'C': {
      item0 = { id: 0, name: '', phone: '', gooid: '' }
      apiName = 'customers'
      body = {
        mode: 'new',
        dbPrefix: c.u,
        name: newName,
        phone: newPhone,
        gooid: newGooid
      }
      newTitle = c.t.customer
      break
    }
    case 'U': {
      item0 = { id: 0, md5: '0', name: '', phone: '', gooid: '' }
      apiName = 'users'
      body = {
        mode: 'new',
        dbPrefix: c.u,
        md5: newMD5,
        name: newName,
        phone: newPhone,
        gooid: newGooid
      }
      newTitle = c.t.user
      break
    }
    case 'S': {
      item0 = { id: 0, date: '', cust: 0, prod: 0, sum: 0, sumd: 0 }
      apiName = 'sales'
      body = {
        mode: 'new',
        dbPrefix: c.u,
        date: newDate,
        cust: newCust,
        prod: newProd,
        sum: newSum,
        sumd: newSumD
      }
      newTitle = c.t.sale
      break
    }
    case 'X': {
      item0 = { id: 0, date: '', xitem: 0, sum: 0 }
      apiName = 'xpenses'
      body = {
        mode: 'new',
        dbPrefix: c.u,
        date: newDate,
        xitem: newXitem,
        sum: newSum
      }
      newTitle = c.t.xpense
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
    setNewMD5(() => '')
    setNewDate(() => '')
    setNewCust(() => '')
    setNewProd(() => '')
    setNewXitem(() => '')
    setNewSum(() => '')
    setNewSumD(() => '')
  }
  function newButtonHandler() {
    dropHandler()
    setFlagNew(() => 'Y')
  }
  function saveNewHandler() {
    switch (a.type) {
      case 'C': {
        if (newName === '') {
          alert('! ' + c.t.emptyField + ' !')
          setFlagNew(() => '')
          return
        }
        break
      }
      case 'U': {
        if (newName === '') {
          alert('! ' + c.t.emptyField + ' !')
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
          alert('! ' + c.t.emptyField + ' !')
          setFlagNew(() => '')
          return
        }
        break
      }
      case 'X': {
        if (newDate === '' || newXitem === '' || newSum === '') {
          alert('! ' + c.t.emptyField + ' !')
          setFlagNew(() => '')
          return
        }
        break
      }
      default: {
        alert(c.t.emptyAPItype)
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
          alert(c.t.db_errX3)
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

    if (a.items.length === 0) {
      cList = []
    } else {
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
              const goodDate =
                item.date.slice(10, 11) === 'T'
                  ? item.date.slice(0, 10) + ', ' + item.date.slice(11, 16)
                  : item.date
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrS(item.id || 0)}
                  className={styles.csOpt}
                >
                  id: {item.id}, {goodDate}
                  <br /> c= {item.cust}, p= {item.prod}, sum=
                  {item.sum} + {item.sumd}
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
              const goodDate =
                item.date.slice(10, 11) === 'T'
                  ? item.date.slice(0, 10) + ', ' + item.date.slice(11, 16)
                  : item.date
              return (
                <div
                  key={item.id}
                  onClick={() => setCurrX(item.id || 0)}
                  className={styles.csOpt}
                >
                  id: {item.id}, {goodDate}
                  <br /> xid= {item.xitem}, sum= {item.sum}
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
        md5: curr.md5,
        name: curr.name,
        phone: curr.phone,
        gooid: curr.gooid
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
        ', +/-d=' +
        curr.sumd +
        ', ' +
        curr.date
      a.setCurrentItem({
        id: curr.id,
        date: curr.date,
        cust: Number(curr.cust),
        prod: Number(curr.prod),
        sum: Number(curr.sum),
        sumd: Number(curr.sumd)
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
          placeholder={c.t.startTyping}
          pattern="[\+\-\*\/\d\s\.,:;_]{1,50}"
          onChange={liveSearch}
          className={styles.inputCust}
        />
        <button
          onClick={newButtonHandler}
          className={stylesH.plusButton}
          hidden={a.mode === 'stat'}
        >
          +{c.t.new}
        </button>
        <button onClick={dropHandler} className={stylesH.dropButton}>
          X
        </button>
      </div>

      <LiveSearchList />

      <div className={styles.floatWrapper} hidden={flagNew === ''}>
        <div className={styles.newCust}>
          <p className={styles.title}>
            {c.t.new} {newTitle}
          </p>
          <p hidden={a.type !== 'C' && a.type !== 'U'}>
            <input
              type="text"
              className={styles.inputCust}
              placeholder={c.t.name}
              pattern="[a-zA-Zа-яА-Я\+\-\*\/\d\s\.,:;_]{1,50}"
              value={newName || ''}
              onChange={(event) =>
                setNewName(
                  event.target.value.replace(
                    /[^a-zA-Zа-яА-Я\+\-\*\/\d\s\.\,\:\;\_]/gi,
                    ''
                  )
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
          {/* <p hidden={a.type !== 'C' && a.type !== 'U'}>
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
          </p> */}
          <p hidden={a.type !== 'U'}>
            <input
              type="text"
              className={styles.inputCust}
              placeholder="md5 hash"
              pattern="^[a-fA-F\d]{0,32}"
              value={newMD5 || ''}
              onChange={(event) =>
                setNewMD5(event.target.value.replace(/[^a-fA-F\d]/g, ''))
              }
            />
          </p>
          <p hidden={a.type !== 'S' && a.type !== 'X'}>
            {c.t.date}:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="2022-02-02"
              pattern="[\s\-\d:\.]{1,15}"
              value={newDate || ''}
              onChange={(event) =>
                setNewDate(event.target.value.replace(/[^\-\s\d:\.]/gi, ''))
              }
            />
          </p>
          <p hidden={a.type !== 'S'}>
            {' '}
            {c.t.custId}:
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
            {c.t.prodId}:
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
            {c.t.eId}:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="xxxx"
              pattern="^[\d]{0,20}"
              value={newXitem || ''}
              onChange={(event) =>
                setNewXitem(event.target.value.replace(/[^\d]/g, ''))
              }
            />
          </p>
          <p hidden={a.type !== 'S' && a.type !== 'X'}>
            {c.t.sum}:
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
          <p hidden={a.type !== 'S'}>
            +/-d:
            <input
              type="text"
              className={styles.inputCust}
              placeholder="xxxx"
              pattern="^[\d\+\-]{0,20}"
              value={newSumD || ''}
              onChange={(event) =>
                setNewSumD(event.target.value.replace(/[^\d\+\-]/g, ''))
              }
            />
          </p>

          <p className={styles.flexRow}>
            <button onClick={saveNewHandler} className={stylesH.sysButton}>
              {c.t.save}
            </button>
            <button onClick={dropHandler} className={stylesH.sysButton}>
              {c.t.cancel}
            </button>
          </p>
        </div>
      </div>
    </>
  )
}

export default LiveSelect
