import { Dispatch, SetStateAction, useEffect } from 'react'
import type { Product } from '../pages/add'

export default function InitProducts(
  setProducts: Dispatch<SetStateAction<Product[]>>
) {
  useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((res: { data: Product[] }) => {
        setProducts(() => res.data || [])
        console.log('Products api res.data:', res.data)
      })
      .catch((error) =>
        console.log('! frontend fetch Prod error - ', error.message)
      )
  }, [])
}
