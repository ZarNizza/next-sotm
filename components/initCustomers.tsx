import { Dispatch, SetStateAction, useEffect } from 'react'
import type { Customer } from '../pages/add'

export default function InitCustomers(
  setCustomers: Dispatch<SetStateAction<Customer[]>>
) {
  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((res: { data: Customer[] }) => {
        setCustomers(() => res.data || [])
        console.log('Customers api res.data:', res.data)
      })
      .catch((error) =>
        console.log('! frontend fetch Customer error - ', error.message)
      )
  }, [])
}
