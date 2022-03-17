import { CheckBoxButton, CheckBoxNewButton } from './CheckBoxButton'
import styles from '../styles/Home.module.css'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { Eitem } from '../pages/minus'

interface EitemsStoreProps {
  eItems: Eitem[]
  setSelectedEitems: Dispatch<SetStateAction<number[]>>
  selectedEitems: number[]
  setNewFlag: Dispatch<SetStateAction<boolean>>
}

export default function EitemsEditStore(props: EitemsStoreProps) {
  //
  function newHandler() {
    props.setNewFlag(true)
  }
  const eItemsCheckBoxesSet = props.eItems.map((item: Eitem) => {
    function checkHandler() {
      if (props.selectedEitems.length === 0) {
        props.setSelectedEitems(() => [item.eid])
      } else {
        if (props.selectedEitems[0] === item.eid) {
          props.setSelectedEitems(() => [])
        } else {
          props.setSelectedEitems(() => [])
          setTimeout(() => props.setSelectedEitems(() => [item.eid]), 100)
        }
      }
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
