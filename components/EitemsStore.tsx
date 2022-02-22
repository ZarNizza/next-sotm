import { CheckBoxButton } from './CheckBoxButton'
import styles from '../styles/Home.module.css'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { Eitem } from '../pages/expenses'

interface EitemsStoreProps {
  eItems: Eitem[]
  setSelectedEitems: Dispatch<SetStateAction<number[]>>
  selectedEitems: number[]
  eCostRef: MutableRefObject<Record<number, number>>
  setGross: Dispatch<SetStateAction<number>>
}

export default function EitemsStore(props: EitemsStoreProps) {
  //
  const eItemsCheckBoxesSet = props.eItems.map((item: Eitem) => {
    function checkHandler() {
      props.setSelectedEitems((prevSelectedEitems) => {
        if (item.eid) delete props.eCostRef.current[item.eid]
        props.setGross(
          Object.values(props.eCostRef.current).reduce(
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
        checked={props.selectedEitems.includes(item.eid)}
      />
    )
  })

  return <div className={styles.flexRowContainer}>{eItemsCheckBoxesSet}</div>
}
