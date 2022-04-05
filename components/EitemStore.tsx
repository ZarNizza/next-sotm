import { CheckBoxButton, CheckBoxNewButton } from './CheckBoxButton'
import styles from '../styles/Home.module.css'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { Eitem } from '../pages/minus'

interface EitemsStoreArgs {
  eItems: Eitem[]
  setSelectedEitems: Dispatch<SetStateAction<number[]>>
  selectedEitems: number[]
  eCostRef: MutableRefObject<Record<number, number>>
  setGross: Dispatch<SetStateAction<number>>
  setNewFlag: Dispatch<SetStateAction<boolean>>
}

export default function EitemStore(arg: EitemsStoreArgs) {
  //
  function newHandler() {
    arg.setNewFlag(true)
  }
  const eItemsCheckBoxesSet = arg.eItems.map((item: Eitem) => {
    function checkHandler() {
      //
      arg.eCostRef.current[item.id] = item.price
      //
      arg.setSelectedEitems((prevSelectedEitems) => {
        if (item.id) {
          delete arg.eCostRef.current[item.id]
        }
        arg.setGross(
          Object.values(arg.eCostRef.current).reduce(
            (prev, curr) => prev + curr,
            0
          )
        )
        return prevSelectedEitems.includes(item.id)
          ? prevSelectedEitems.filter(
              (product: Eitem['id']) => product !== item.id
            )
          : [...prevSelectedEitems, item.id]
      })
    }

    return (
      <CheckBoxButton
        key={item.id}
        text={item.symbol}
        onClick={checkHandler}
        checked={arg.selectedEitems.includes(item.id)}
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
