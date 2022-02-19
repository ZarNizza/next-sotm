import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from '../styles/Home.module.css'
// import EditFormArgs from './DBshortEditDropTable'

type EditFormArgs = {
  setIdToEdit: Dispatch<SetStateAction<number>>
  idName: string
  keys: string[]
  itemToEdit: Record<string, string | number | Date | null>[]
}

export default function EditForm(args: EditFormArgs) {
  const [editItem, setEditItem] = useState(args.itemToEdit[0])
  console.log('---- start editItem --- =', editItem)

  function saveEdit() {
    console.log('++++ save editItem +++', editItem)
    args.setIdToEdit(() => 0)
  }
  function cancelEdit() {
    args.setIdToEdit(() => 0)
  }

  function inputChangeHandler(e: ChangeEvent<HTMLInputElement>, key: string) {
    let item = Object.assign({}, editItem)
    console.log('----{}--- item_0 =', item)
    item[key] = e.target.value
    console.log('======= item_1 =', item)
    setEditItem(() => item)
  }

  return (
    <div className={styles.editForm}>
      {Object.keys(editItem).map((k) => {
        if (k !== args.idName) {
          return (
            <input
              type="text"
              name={k}
              value={editItem ? String(editItem[k]) : ''}
              onChange={(event) => inputChangeHandler(event, k)}
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
