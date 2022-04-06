import { Dispatch, SetStateAction } from 'react'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import { User } from '../pages/editUsers'
import { Eitem, Xpense } from '../pages/minus'
import { Customer, Product, Sale } from '../pages/plus'

export default function Init(
  setItems:
    | Dispatch<SetStateAction<Customer[]>>
    | Dispatch<SetStateAction<Product[]>>
    | Dispatch<SetStateAction<Sale[]>>
    | Dispatch<SetStateAction<Xpense[]>>
    | Dispatch<SetStateAction<User[]>>
    | Dispatch<SetStateAction<Eitem[]>>,
  apiSuffix: string,
  updateLocalStorage?: boolean
) {
  let items: string | null = ''

  try {
    if (updateLocalStorage) throw null
    items = localStorage.getItem(apiSuffix)
    if (items === null) throw null
    if (items !== '') {
      console.log('Init ', apiSuffix, ' - LocStor GOOD')
      setItems(JSON.parse(items))
    } else {
      console.log('Init ', apiSuffix, ' - LocStor error - empty response')
    }
  } catch {
    console.log(
      'Init ',
      apiSuffix,
      ' catch-api - NO LocalStorage Data >>> go fetch DB'
    )

    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: apiSuffix,
      title: 'get' + apiSuffix,
      setResData: setItems
    }

    fetchHandler(args).catch((error) =>
      console.log(
        '! Init ',
        apiSuffix,
        ' error from fetchHandler - ',
        error.message
      )
    )
  }
}
