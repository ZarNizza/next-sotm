import { Dispatch, SetStateAction, useEffect } from 'react'
import type { Eitem } from '../pages/minus'

export default function InitEitems(
  setEitems: Dispatch<SetStateAction<Eitem[]>>
) {
  useEffect(() => {
    fetch('/api/eitems')
      .then((res) => res.json())
      .then((res: { data: Eitem[] }) => {
        setEitems(() => res.data || [])
        console.log('setEitems api res.data:', res.data)
      })
      .catch((error) =>
        console.log('! frontend fetch setEitems error - ', error.message)
      )
  }, [])
}
