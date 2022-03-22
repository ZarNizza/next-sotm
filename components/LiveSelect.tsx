import {
  ChangeEvent,
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useRef,
  useState
} from 'react'
import type { Customer, Sale } from '../pages/plus'
import type { Xpense } from '../pages/minus'
import type { User } from '../pages/editUsers'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'

type SelectArgs = {
  items: Customer[] | User[] | Sale[] | Xpense[]
  setItems: Dispatch<
    SetStateAction<Customer[] | User[] | Sale[] | Xpense[] | []>
  >
  currentItem: Customer | User | Sale | Xpense
  setCurrentItem: Dispatch<SetStateAction<Customer | User | Sale | Xpense>>
  mode: string
  type: string
}

export default function Select(arg: SelectArgs) {
  const [searchWord, setSearchWord] = useState('')
  const customerInputRef = useRef<HTMLInputElement>(null)
  const [flagNew, setFlagNewItem] = useState('')
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newGooid, setNewGooid] = useState('')
  const [newTimeZone, setNewTimeZone] = useState('')
  const [newDate, setNewDate] = useState('')
  const [newCust, setNewCust] = useState('')
  const [newProd, setNewProd] = useState('')
  const [newXitem, setNewXitem] = useState('')
  const [newSum, setNewSum] = useState('')

  let item0: SetStateAction<Customer | User | Sale | Xpense>
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

  switch (arg.type) {
    case 'C': {
      item0 = { id: 0, name: '', phone: '', gooid: '' }
      apiName = 'customers'
      body = { mode: 'new', name: newName, phone: newPhone }
      break
    }
    case 'U': {
      item0 = { id: 0, name: '', phone: '', gooid: '', timezone: '' }
      apiName = 'users'
      body = { mode: 'new', name: newName, phone: newPhone }
      break
    }
    case 'S': {
      item0 = { id: 0, date: '', cust: 0, prod: 0, sum: 0 }
      apiName = 'sales'
      body = { mode: 'new' }
      break
    }
    case 'X': {
      item0 = { id: 0, date: '', xitem: 0, sum: 0 }
      apiName = 'xpenses'
      body = { mode: 'new' }
      break
    }
    default: {
      console.log('LiveSelect !!! empty item type.')
      return
    }
  }

  function liveSearch(e: ChangeEvent<HTMLInputElement>) {
    const st = e.target.value.toLowerCase()
    setSearchWord(() => st)
    arg.setCurrentItem(item0)
  }

  function dropButtonHandler() {
    setSearchWord(() => '')
    if (customerInputRef.current !== null) customerInputRef.current.value = ''
    arg.setCurrentItem(item0)
  }
  function newButtonHandler() {
    setFlagNewItem(() => 'Y')
  }

  function saveNewHandler() {
    if (newName === '' || newPhone === '') {
      alert('! empty field !')
      setFlagNewItem(() => '')
      return
    }
    return new Promise((resolveSS, rejectSS) => {
      fetch('/api/' + apiName, {
        method: 'POST',
        body: JSON.stringify(body)
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            console.log(
              '---  ' + arg.type + 'saveNew DB/api error: ' + res.error
            )
            alert('DataBase error: X3')
            rejectSS(res.error)
          } else {
            resolveSS(res)
          }
        })
        .catch((error) => {
          console.log(
            '---  ' + arg.type + 'catch saveNew fetch error - ',
            error
          )
          alert('fetch data error: X3')
        })
    })
      .then(() => {
        new Promise((resolveUC, rejectUC) => {
          fetch('/api/' + apiName)
            .then((apiRes) => apiRes.json())
            .then((apiRes) => {
              if (apiRes.error) {
                console.log(
                  '--- ',
                  arg.type,
                  ' Select DB/api error: ' + apiRes.error
                )
                alert('DataBase error: X3')
                rejectUC(apiRes.error)
              } else {
                arg.setItems(() => apiRes.data || [])
                resolveUC(apiRes)
              }
            })
            .catch((error) => {
              console.log(
                '--- catch ',
                arg.type,
                ' Select fetch error - ',
                error
              )
              alert('fetch ' + arg.type + ' data error: X3')
            })
        })
      })
      .then(() => {
        setNewName(() => '')
        setNewPhone(() => '')
        setFlagNewItem(() => '')
      })
      .catch()
  }

  function cancelNewHandler() {
    setNewName(() => '')
    setNewPhone(() => '')
    setFlagNewItem(() => '')
  }

  // function LiveSearchList() {
  //   if (searchWord === '' || (!!arg.currentItem.id && arg.currentItem.id > 0))
  //     return <></>

  //   let cList: any

  //   switch (arg.type) {
  //     case 'C': {
  //       cList = arg.items
  //         .filter((item: Customer) => {
  //           return item.name.toLowerCase().includes(searchWord)
  //         })
  //         .map((item: Customer) => {
  //           return (
  //             <div
  //               key={item.id}
  //               onClick={() => setCurrC(item.id)}
  //               className={styles.csOpt}
  //             >
  //               {item.name}
  //             </div>
  //           )
  //         })
  //       break
  //     }
  //     case 'U': {
  //       cList = arg.items
  //         .filter((item: User) => {
  //           return item.name.toLowerCase().includes(searchWord)
  //         })
  //         .map((item: User) => {
  //           return (
  //             <div
  //               key={item.id}
  //               onClick={() => setCurrU(item.id)}
  //               className={styles.csOpt}
  //             >
  //               {item.name}
  //             </div>
  //           )
  //         })
  //       break
  //     }
  //     case 'S': {
  //       cList = arg.items
  //         .filter((item: Sale) => {
  //           return (
  //             String(item.id).includes(searchWord) ||
  //             String(item.cust).includes(searchWord) ||
  //             String(item.prod).includes(searchWord) ||
  //             item.date.toLowerCase().includes(searchWord)
  //           )
  //         })
  //         .map((item: Sale) => {
  //           return (
  //             <div
  //               key={item.id}
  //               onClick={() => setCurrS(item.id)}
  //               className={styles.csOpt}
  //             >
  //               id={item.id}, c={item.cust}, p={item.prod}, sum=
  //               {item.sum}, {item.date}
  //             </div>
  //           )
  //         })
  //       break
  //     }
  //     case 'X': {
  //       cList = arg.items
  //         .filter((item: Xpense) => {
  //           return (
  //             String(item.id).includes(searchWord) ||
  //             item.date.toLowerCase().includes(searchWord) ||
  //             String(item.xitem).includes(searchWord)
  //           )
  //         })
  //         .map((item: Xpense) => {
  //           return (
  //             <div
  //               key={item.id}
  //               onClick={() => setCurrX(item.id)}
  //               className={styles.csOpt}
  //             >
  //               id:{item.id}, xi={item.xitem}, sum={item.sum}, {item.date}
  //             </div>
  //           )
  //         })
  //       break
  //     }
  //     default: {
  //       console.log('! LiveSearchList argType undefined !')
  //     }
  //   }

  //   if (cList.length === 0) return <></>

  //   return (
  //     <div className={styles.floatWrapper}>
  //       <div className={styles.selectListForm}>
  //         <div className={styles.selectList}>{cList}</div>
  //       </div>
  //     </div>
  //   )
  // }

  // function setCurrC(id: any) {
  //   const st = arg.items.filter((item: Customer) => {
  //     return item.id === Number(id)
  //   })
  //   if (st.length === 1 && customerInputRef.current !== null) {
  //     const curr = st[0]
  //     customerInputRef.current.value = curr.name
  //     arg.setCurrentItem({
  //       id: Number(curr.id),
  //       name: curr.name,
  //       phone: curr.phone,
  //       gooid: curr.gooid
  //     })
  //   }
  // }

  // function setCurrU(id: any) {
  //   const st = arg.items.filter((item: User) => {
  //     return item.id === Number(id)
  //   })
  //   if (st.length === 1 && customerInputRef.current !== null) {
  //     const curr = st[0]
  //     customerInputRef.current.value = curr.name
  //     arg.setCurrentItem({
  //       id: Number(curr.id),
  //       name: curr.name,
  //       phone: curr.phone,
  //       gooid: curr.gooid
  //     })
  //   }
  // }

  // function setCurrS(id: any) {
  //   const st = arg.items.filter((item: Sale) => {
  //     return item.id === Number(id)
  //   })
  //   if (st.length === 1 && customerInputRef.current !== null) {
  //     const curr = st[0]
  //     customerInputRef.current.value = curr.name
  //     arg.setCurrentItem({
  //       id: Number(curr.id),
  //       name: curr.name,
  //       phone: curr.phone,
  //       gooid: curr.gooid
  //     })
  //   }
  // }

  // function setCurrX(id: any) {
  //   const st = arg.items.filter((item: Xpense) => {
  //     return item.id === Number(id)
  //   })
  //   if (st.length === 1 && customerInputRef.current !== null) {
  //     const curr = st[0]
  //     customerInputRef.current.value = curr.name
  //     arg.setCurrentItem({
  //       id: Number(curr.id),
  //       name: curr.name,
  //       phone: curr.phone,
  //       gooid: curr.gooid
  //     })
  //   }
  // }

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

      {/* <LiveSearchList /> */}

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
            <button onClick={cancelNewHandler} className={stylesH.sysButton}>
              Cancel
            </button>
          </p>
        </div>
      </div>
    </>
  )
}
