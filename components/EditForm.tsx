import { Dispatch, SetStateAction, useState } from 'react'
import styles from '../styles/Home.module.css'
// import EditFormArgs from './DBshortEditDropTable'

type EditFormArgs = {
  setIdToEdit: Dispatch<SetStateAction<number>>
  idName: string
  keys: string[]
  itemToEdit: Record<string, string | number | Date | null>[]
  setItemToEdit: Dispatch<
    SetStateAction<Record<string, string | number | Date | null>[]>
  >
}

export default function EditForm(args: EditFormArgs) {
  function saveEdit() {
    args.setItemToEdit(() => [])
    args.setIdToEdit(() => 0)
  }
  function cancelEdit() {
    args.setItemToEdit(() => [])
    args.setIdToEdit(() => 0)
  }

  function inputChangeHandler(e: any) {
    let item = args.itemToEdit
    console.log('------- item_0 =', item)
    const name = e.target.name
    const val = e.target.value
    const rec = { name, val }
    item[0][name] = val
    console.log('======= item_1 =', item)
    args.setItemToEdit(() => item)
    console.log('inChHandler: rec=', rec, 'i2E=', args.itemToEdit)
  }

  return (
    <div className={styles.editForm}>
      {args.keys.map((key) => {
        if (key !== args.idName) {
          return (
            <input
              type="text"
              name={String(key)}
              value={
                args.itemToEdit.length > 0
                  ? String(args.itemToEdit[0][String(key)])
                  : 0
              }
              onChange={inputChangeHandler}
              key={Math.random()}
            />
          )
        }
      })}

      <p> </p>
      <div className={styles.flexRowContainer}>
        <button className={styles.sysButton} onClick={saveEdit}>
          Save
        </button>
        <button className={styles.sysButton} onClick={cancelEdit}>
          Cancel
        </button>
      </div>
    </div>
  )
}
