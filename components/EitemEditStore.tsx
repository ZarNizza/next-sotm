import { CheckBoxButton, CheckBoxNewButton } from './CheckBoxButton'
import styles from '../styles/Home.module.css'
import { Dispatch, SetStateAction } from 'react'
import { Eitem } from '../pages/minus'

interface EitemsStoreArgs {
  eItems: Eitem[]
  setCurrEitem: Dispatch<SetStateAction<number>>
  currEitem: number
  setNewFlag: Dispatch<SetStateAction<boolean>>
}

export default function EitemEditStore(arg: EitemsStoreArgs) {
  //
  function newHandler() {
    arg.setNewFlag(true)
  }
  const eItemsCheckBoxesSet = arg.eItems.map((item: Eitem) => {
    function checkHandler() {
      if (arg.currEitem === 0) {
        arg.setCurrEitem(() => item.eid)
      } else {
        if (arg.currEitem === item.eid) {
          arg.setCurrEitem(() => 0)
        } else {
          arg.setCurrEitem(() => 0)
          setTimeout(() => arg.setCurrEitem(() => item.eid), 100)
        }
      }
    }

    return (
      <CheckBoxButton
        key={item.eid}
        text={item.esymbol}
        onClick={checkHandler}
        checked={arg.currEitem === item.eid}
      />
    )
  })
  eItemsCheckBoxesSet.push(
    <CheckBoxNewButton
      key="new!"
      text="+New"
      onClick={newHandler}
      checked={false}
    />
  )
  return <div className={styles.flexRowContainer}>{eItemsCheckBoxesSet}</div>
}
