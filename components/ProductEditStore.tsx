import { CheckBoxButton, CheckBoxNewButton } from './CheckBoxButton'
import styles from '../styles/Home.module.css'
import { Dispatch, SetStateAction } from 'react'
import { Product } from '../pages/plus'

interface ProductsStoreArgs {
  pItems: Product[]
  setCurrPitem: Dispatch<SetStateAction<number>>
  currPitem: number
  setNewFlag: Dispatch<SetStateAction<boolean>>
}

export default function ProductEditStore(arg: ProductsStoreArgs) {
  //
  function newHandler() {
    arg.setNewFlag(true)
  }
  const pItemsCheckBoxesSet = arg.pItems.map((item: Product) => {
    function checkHandler() {
      if (arg.currPitem === 0) {
        arg.setCurrPitem(() => item.pid)
      } else {
        if (arg.currPitem === item.pid) {
          arg.setCurrPitem(() => 0)
        } else {
          arg.setCurrPitem(() => 0)
          setTimeout(() => arg.setCurrPitem(() => item.pid), 100)
        }
      }
    }

    return (
      <CheckBoxButton
        key={item.pid}
        text={item.psymbol}
        onClick={checkHandler}
        checked={arg.currPitem === item.pid}
      />
    )
  })
  pItemsCheckBoxesSet.push(
    <CheckBoxNewButton
      key="new!"
      text="+New"
      onClick={newHandler}
      checked={false}
    />
  )
  return <div className={styles.flexRowContainer}>{pItemsCheckBoxesSet}</div>
}
