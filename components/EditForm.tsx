import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import styles from '../styles/Home.module.css'
import fetchHandler from './fetchHandler'
// import EditFormArgs from './DBshortEditDropTable'

type EditFormArgs = {
  setIdToEdit: Dispatch<SetStateAction<number>>
  idName: string
  keys: string[]
  itemToEdit: Record<string, string | number | Date | null>[]
  // setItemToEdit: Dispatch<
  //   SetStateAction<Record<string, string | number | Date | null>[]>
  //>
}

export default function EditForm(arg: EditFormArgs) {
  const [editItem, setEditItem] = useState<any>(arg.itemToEdit[0])
  const [focus, setFocus] = useState(0)

  function saveEdit() {
    console.log('++++ save editItem +++', editItem)

  let  args: { title: string; body: string; apiSuffix: string } = {

    apiSuffix : 'customers',
    title : 'edit',
    body : JSON.stringify({
      mode: 'edit',
      cname: editItem.cname,
      cphone: editItem.cphone,
      gooid: editItem.gooid,
      cid: editItem.cid
    })
  }
    fetch('/api/' + args.apiSuffix, { method: 'POST', body: args.body })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(args.apiSuffix + ': ' + args.title + ' ERROR:' + res.error)
        } else {
          console.log(
            args.apiSuffix,
            args.title,
            '>>>>>>>>> resData=',
            res.data
          )
          // if (res.data !== undefined && res.data !== 'OK')
          //   args.setResData(() => res.data)
        }
      })
      .catch((error) =>
        alert(
          '! ' +
            args.apiSuffix +
            ': ' +
            args.title +
            ' error - ' +
            error.message
        )
      )
    // arg.setItemToEdit(() => editItem)
    arg.setIdToEdit(() => 0)
  }
  function cancelEdit() {
    arg.setIdToEdit(() => 0)
    // arg.setItemToEdit(() => [])
  }

  // function inputChangeHandler(e: ChangeEvent<HTMLInputElement>, key: string) {
  //   let item = Object.assign({}, editItem)
  //   console.log('----{}--- item_0 =', item)
  //   item[key] = e.target.value
  //   console.log('======= item_1 =', item)
  //   setEditItem(() => item)
  // }

  return (
    <div className={styles.editForm}>
      {editItem === undefined
        ? ''
        : Object.keys(editItem).map((k, i) => {
            if (k !== arg.idName) {
              return (
                <input
                  type="text"
                  name={k}
                  value={
                    editItem && editItem[k] !== null ? String(editItem[k]) : ''
                  }
                  onChange={(event) =>
                    setEditItem((prev: any) => {
                      setFocus(() => i)
                      let a = Object.assign({}, prev)
                      a[k] = event.target.value
                      return a
                    })
                  }
                  key={Math.random()}
                  autoFocus={i === focus ? true : false}
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
function fetchArgs(fetchArgs: any) {
  throw new Error('Function not implemented.')
}
