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
        arg.setCurrEitem(() => item.id)
      } else {
        if (arg.currEitem === item.id) {
          arg.setCurrEitem(() => 0)
        } else {
          arg.setCurrEitem(() => 0)
          setTimeout(() => arg.setCurrEitem(() => item.id), 100)
        }
      }
    }

    return (
      <CheckBoxButton
        key={item.id}
        text={item.symbol}
        onClick={checkHandler}
        checked={arg.currEitem === item.id}
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
