import { CheckBoxButton, CheckBoxNewButton } from './CheckBoxButton'
import styles from '../styles/Home.module.css'
import { Dispatch, SetStateAction } from 'react'
import { Eitem } from '../pages/minus'
import { useRouter } from 'next/router'
import { en } from '../locales/en'
import { ru } from '../locales/ru'

interface EitemsStoreArgs {
  items: Eitem[]
  setCurrItem: Dispatch<SetStateAction<number>>
  currItem: number
  setNewFlag: Dispatch<SetStateAction<boolean>>
}

export default function EitemEditStore(arg: EitemsStoreArgs) {
  const t = useRouter().locale === 'en' ? en : ru
  //
  function newHandler() {
    arg.setNewFlag(true)
  }

  const eItemsCheckBoxesSet = arg.items.map((item: Eitem) => {
    function checkHandler() {
      if (arg.currItem === 0) {
        arg.setCurrItem(() => item.id)
      } else {
        if (arg.currItem === item.id) {
          arg.setCurrItem(() => 0)
        } else {
          arg.setCurrItem(() => 0)
          setTimeout(() => arg.setCurrItem(() => item.id), 100)
        }
      }
    }

    return (
      <CheckBoxButton
        key={item.id}
        text={item.symbol}
        onClick={checkHandler}
        checked={arg.currItem === item.id}
      />
    )
  })
  eItemsCheckBoxesSet.push(
    <CheckBoxNewButton
      key="new!"
      text={'+' + t.new}
      onClick={newHandler}
      checked={false}
    />
  )
  return <div className={styles.flexRowContainer}>{eItemsCheckBoxesSet}</div>
}
