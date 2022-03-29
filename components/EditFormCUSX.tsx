import { useState } from 'react'
import { Customer, Product, Sale } from '../pages/plus'
import { Eitem, Xpense } from '../pages/minus'
import { User } from '../pages/editUsers'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'

type editFormArgs = {
  itemToEdit: any
  updateFunc: any
  resetParams: any
  type: 'C' | 'U' | 'P' | 'E' | 'S' | 'X'
}
//  {
// id: number
// name?: string
// phone?: string
// gooid?: string
// timezone?: string
// symbol?: string
// date?: string
// cust?: number
// prod?: number
// xitem?: number
// sum?: number
// }

export default function EditForm(a: editFormArgs) {
  const [newName, setNewName] = useState(a.itemToEdit.name || '')
  const [newPhone, setNewPhone] = useState(a.itemToEdit.phone || '')
  const [newGooid, setNewGooid] = useState(a.itemToEdit.gooid || '')
  const [newTimeZone, setNewTimeZone] = useState(a.itemToEdit.timezone || '')
  const [newSymbol, setNewSymbol] = useState(a.itemToEdit.symbol || '')
  const [newDate, setNewDate] = useState(a.itemToEdit.date || '')
  const [newCust, setNewCust] = useState(a.itemToEdit.cust || 0)
  const [newProd, setNewProd] = useState(a.itemToEdit.prod || 0)
  const [newXitem, setNewXitem] = useState(a.itemToEdit.xitem || 0)
  const [newSum, setNewSum] = useState(a.itemToEdit.sum || 0)

  function saveEditHandler() {
    let apiName: string = ''
    let apiBody: string = ''

    switch (a.type) {
      case 'C': {
        apiName = 'customers'
        apiBody = JSON.stringify({
          mode: 'edit',
          name: newName,
          phone: newPhone,
          gooid: a.itemToEdit.gooid,
          id: a.itemToEdit.id
        })
        break
      }
      case 'U': {
        apiName = 'users'
        apiBody = JSON.stringify({
          mode: 'edit',
          name: newName,
          phone: newPhone,
          gooid: newGooid,
          timezone: newTimeZone,
          id: a.itemToEdit.id
        })
        break
      }
      case 'P': {
        apiName = 'products'
        apiBody = JSON.stringify({
          mode: 'edit',
          name: newName,
          symbol: newSymbol,
          id: a.itemToEdit.id
        })
        break
      }
      case 'E': {
        apiName = 'eitems'
        apiBody = JSON.stringify({
          mode: 'edit',
          name: newName,
          symbol: newSymbol,
          id: a.itemToEdit.id
        })
        break
      }
      case 'S': {
        apiName = 'sales'
        apiBody = JSON.stringify({
          mode: 'edit',
          date: newDate,
          cust: newCust,
          prod: newProd,
          sum: newSum,
          id: a.itemToEdit.id
        })
        break
      }
      case 'X': {
        apiName = 'xpenses'
        apiBody = JSON.stringify({
          mode: 'edit',
          date: newDate,
          xitem: newXitem,
          sum: newSum,
          id: a.itemToEdit.id
        })
        break
      }
    }

    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: apiName,
      title: 'edit',
      body: apiBody,
      setResData: console.log
    }

    fetchHandler(args)
      .then(() => {
        console.log('update promise')
        a.updateFunc()
      })
      .catch((err) => console.log('update promise - ', err))
  }

  return (
    <div className={styles.newCeditForm}>
      <p hidden={a.type === 'S' || a.type === 'X'}>
        Name:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="Name"
          pattern="[a-zA-Zа-яА-Я\s\-\d]{1,50}"
          value={newName || ''}
          onChange={(event) =>
            setNewName(
              event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s\d]/gi, '')
            )
          }
        />
      </p>
      <p hidden={a.type !== 'P' && a.type !== 'E'}>
        Symbol:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="Symbol"
          pattern="[a-zA-Zа-яА-Я\s\-\d]{1,7}"
          value={newSymbol || ''}
          onChange={(event) =>
            setNewSymbol(
              event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s\d]/gi, '')
            )
          }
        />
      </p>
      <p hidden={a.type !== 'C' && a.type !== 'U'}>
        Phone:
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
        GooId
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
          placeholder="Name"
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
            setNewCust(Number(event.target.value.replace(/[^\d]/g, '')))
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
            setNewProd(Number(event.target.value.replace(/[^\d]/g, '')))
          }
        />
      </p>
      <p hidden={a.type !== 'X'}>
        X-item:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="xxxx"
          pattern="^[\d]{0,20}"
          value={newXitem || ''}
          onChange={(event) =>
            setNewXitem(Number(event.target.value.replace(/[^\d]/g, '')))
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
            setNewSum(Number(event.target.value.replace(/[^\d]/g, '')))
          }
        />
      </p>

      <div className={stylesH.flexRowContainer}>
        <button onClick={saveEditHandler} className={styles.saveButton}>
          Save
        </button>
        <button onClick={() => a.resetParams()} className={styles.cancelButton}>
          Cancel
        </button>
      </div>
    </div>
  )
}
