import { useState } from 'react'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'
import { AppContext } from './AppContext'
import { useContext } from 'react'

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
// md5?: string
// symbol?: string
// date?: string
// cust?: number
// prod?: number
// xitem?: number
// sum?: number
// num?: number
// sumD?: number
// }

export default function EditForm(a: editFormArgs) {
  const c = useContext(AppContext)
  const goodDate =
    !!a.itemToEdit.date && a.itemToEdit.date.slice(10, 11) === 'T'
      ? a.itemToEdit.date.slice(0, 10) + ', ' + a.itemToEdit.date.slice(11, 16)
      : a.itemToEdit.date
  const [newName, setNewName] = useState(a.itemToEdit.name || '')
  const [newPhone, setNewPhone] = useState(a.itemToEdit.phone || '')
  const [newGooid, setNewGooid] = useState(a.itemToEdit.gooid || '')
  const [newMD5, setNewMD5] = useState(a.itemToEdit.md5 || '')
  const [newSymbol, setNewSymbol] = useState(a.itemToEdit.symbol || '')
  const [newPrice, setNewPrice] = useState(a.itemToEdit.price || 0)
  const [newDate, setNewDate] = useState(goodDate || '')
  const [newCust, setNewCust] = useState(a.itemToEdit.cust || 0)
  const [newProd, setNewProd] = useState(a.itemToEdit.prod || 0)
  const [newXitem, setNewXitem] = useState(a.itemToEdit.xitem || 0)
  const [newSum, setNewSum] = useState(a.itemToEdit.sum || 0)
  const [newNum, setNewNum] = useState(a.itemToEdit.num || 0)
  const [newSumD, setNewSumD] = useState(a.itemToEdit.sumd || 0)

  function saveEditHandler() {
    let apiName: string = ''
    let apiBody: string = ''

    switch (a.type) {
      case 'C': {
        apiName = 'customers'
        apiBody = JSON.stringify({
          mode: 'edit',
          dbPrefix: c.u,
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
          dbPrefix: c.u,
          md5: newMD5,
          name: newName,
          phone: newPhone,
          gooid: newGooid,
          id: a.itemToEdit.id
        })
        break
      }
      case 'P': {
        apiName = 'products'
        apiBody = JSON.stringify({
          mode: 'edit',
          dbPrefix: c.u,
          name: newName,
          symbol: newSymbol,
          price: newPrice,
          id: a.itemToEdit.id
        })
        break
      }
      case 'E': {
        apiName = 'eitems'
        apiBody = JSON.stringify({
          mode: 'edit',
          dbPrefix: c.u,
          name: newName,
          symbol: newSymbol,
          price: newPrice,
          id: a.itemToEdit.id
        })
        break
      }
      case 'S': {
        apiName = 'sales'
        apiBody = JSON.stringify({
          mode: 'edit',
          dbPrefix: c.u,
          date: newDate,
          cust: newCust,
          prod: newProd,
          sum: newSum,
          sumd: newSumD,
          id: a.itemToEdit.id
        })
        break
      }
      case 'X': {
        apiName = 'xpenses'
        apiBody = JSON.stringify({
          mode: 'edit',
          dbPrefix: c.u,
          date: newDate,
          xitem: newXitem,
          sum: newSum,
          num: newNum,
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
      <p hidden={a.type !== 'P' && a.type !== 'E'}>
        Symbol:
        <input
          type="text"
          className={styles.inputCust}
          placeholder={c.t.symbol}
          pattern="[a-zA-Zа-яА-Я\+\-\*\/\d\s\.,:;_]{1,7}"
          value={newSymbol || ''}
          onChange={(event) =>
            setNewSymbol(
              event.target.value.replace(
                /[^a-zA-Zа-яА-Я\+\-\*\/\d\s\.\,\:\;\_]/gi,
                ''
              )
            )
          }
        />
      </p>
      <p hidden={a.type !== 'P' && a.type !== 'E'}>
        Price:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="123.."
          pattern="[\d]{1,7}"
          value={newPrice || ''}
          onChange={(event) =>
            setNewPrice(event.target.value.replace(/[^\d]/gi, ''))
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
      <p hidden={a.type !== 'U'}>
        &nbsp;&nbsp;MD5:
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

      <p hidden={a.type !== 'S' && a.type !== 'X'}>
        Date:
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
      <p hidden={a.type !== 'X'}>
        Num:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="xxxx"
          pattern="^[\d]{0,20}"
          value={newNum || ''}
          onChange={(event) =>
            setNewNum(Number(event.target.value.replace(/[^\d]/g, '')))
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
            setNewSumD(Number(event.target.value.replace(/[^\d\+\-]/g, '')))
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
