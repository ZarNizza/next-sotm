import { CheckBoxButton, CheckBoxNewButton } from './CheckBoxButton'
import styles from '../styles/Home.module.css'
import { Dispatch, MutableRefObject, SetStateAction } from 'react'
import { Eitem } from '../pages/minus'
import NewEitem from '../components/NewEitem'

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
      props.setSelectedEitems((prevSelectedEitem) =>
        prevSelectedEitem.includes(item.eid) ? [] : [item.eid]
      )
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
