import { useState } from 'react'
import { User } from '../pages/editUsers'
import styles from './Select.module.scss'
import stylesH from '../styles/Home.module.css'
import fetchHandler, { FetchArgs } from './fetchHandler'
type editFormArgs = {
  userToEdit: User
  setUpdateFlag: any
  cancelFlag: any
}

export default function UserEditForm(a: editFormArgs) {
  const [uName, setUName] = useState(a.userToEdit.name)
  const [uPhone, setUPhone] = useState(a.userToEdit.phone)
  const [tZone, setTzone] = useState(a.userToEdit.timezone)

  function saveEditHandler() {
    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: 'users',
      title: 'editUser',
      body: JSON.stringify({
        mode: 'edit',
        name: uName,
        phone: uPhone,
        gooid: a.userToEdit.gooid,
        timezone: tZone,
        id: a.userToEdit.id
      }),
      setResData: a.setUpdateFlag
    }
    fetchHandler(args)
  }

  function cancelHandler() {
    return a.cancelFlag()
  }

  return (
    <div className={stylesH.newUeditForm}>
      <p>
        <input
          type="text"
          className={styles.inputCust}
          placeholder="Name"
          pattern="[a-zA-Zа-яА-Я\s\-]{1,50}"
          value={uName}
          onChange={(event) =>
            setUName(event.target.value.replace(/[^a-zA-Zа-яА-Я\-\s]/gi, ''))
          }
        />
      </p>
      <p>
        {' '}
        <input
          type="text"
          className={styles.inputCust}
          placeholder="+x xxx xxx xxxx, xxxx"
          pattern="^\+?[\d\s\-]{0,20}"
          value={uPhone || ''}
          onChange={(event) =>
            setUPhone(event.target.value.replace(/[^\d\-\+\s]/g, ''))
          }
        />
      </p>
      <p>
        {' '}
        Tzone:
        <input
          type="text"
          className={styles.inputCust}
          placeholder="+xx"
          pattern="^\+?[\d\+\-]{0,3}"
          value={tZone || ''}
          onChange={(event) =>
            setTzone(event.target.value.replace(/[^\d\-\+]/g, ''))
          }
        />
      </p>

      <div className={stylesH.flexRowContainer}>
        <button onClick={saveEditHandler} className={stylesH.sysButton}>
          Save
        </button>
        <button onClick={cancelHandler} className={stylesH.sysButton}>
          Cancel
        </button>
      </div>
    </div>
  )
}
