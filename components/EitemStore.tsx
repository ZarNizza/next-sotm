import { CheckBoxButton, CheckBoxNewButton } from './CheckBoxButton'
import styles from '../styles/Home.module.css'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { Eitem } from '../pages/minus'
import { AppContext } from './AppContext'
import { useContext } from 'react'

interface EitemsStoreArgs {
  eItems: Eitem[]
  setSelectedEitems: Dispatch<SetStateAction<number[]>>
  selectedEitems: number[]
  eCostRef: MutableRefObject<Record<number, number>>
  setGross: Dispatch<SetStateAction<number>>
  setNewFlag: Dispatch<SetStateAction<boolean>>
}

export default function EitemStore(arg: EitemsStoreArgs) {
  const c = useContext(AppContext)
  //
  function newHandler() {
    arg.setNewFlag(true)
  }
  const eItemsCheckBoxesSet = arg.eItems.map((item: Eitem) => {
    //
    function checkHandler() {
      if (
        arg.eCostRef.current[item.id] ||
        arg.eCostRef.current[item.id] === 0
      ) {
        delete arg.eCostRef.current[item.id]
      } else {
        arg.eCostRef.current[item.id] = item.price
      }
      //
      arg.setGross(
        Object.values(arg.eCostRef.current).reduce(
          (prev, curr) => prev + curr,
          0
        )
      )
      //
      arg.setSelectedEitems((prevSelectedEitems) => {
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
      text={'+' + c.t.new}
      onClick={newHandler}
      checked={false}
    />
  )
  return <div className={styles.flexRowContainer}>{eItemsCheckBoxesSet}</div>
}
