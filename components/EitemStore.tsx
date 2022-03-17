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
      arg.setSelectedEitems((prevSelectedEitems) => {
        if (item.eid) delete arg.eCostRef.current[item.eid]
        arg.setGross(
          Object.values(arg.eCostRef.current).reduce(
            (prev, curr) => prev + curr,
            0
          )
        )
        return prevSelectedEitems.includes(item.eid)
          ? prevSelectedEitems.filter(
              (product: Eitem['eid']) => product !== item.eid
            )
          : [...prevSelectedEitems, item.eid]
      })
    }

    return (
      <CheckBoxButton
        key={item.eid}
        text={item.esymbol}
        onClick={checkHandler}
        checked={arg.selectedEitems.includes(item.eid)}
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
