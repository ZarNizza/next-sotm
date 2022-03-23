import { Dispatch, SetStateAction } from 'react'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import type { Customer, Product } from '../pages/plus'
import type { Eitem } from '../pages/minus'

export default function Init(
  setItems:
    | Dispatch<SetStateAction<Customer[]>>
    | Dispatch<SetStateAction<Product[]>>
    | Dispatch<SetStateAction<Eitem[]>>,
  apiSuffix: string
) {
  const args: FetchArgs = {
    method: 'GET',
    apiSuffix: apiSuffix,
    title: 'get' + apiSuffix,
    setResData: setItems
  }
  fetchHandler(args).catch((error) =>
    console.log('! Init ', apiSuffix, ' fetch error - ', error.message)
  )
}
