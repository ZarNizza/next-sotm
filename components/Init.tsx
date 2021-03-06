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
  dbPrefix: string,
  updateLocalStorage?: boolean
) {
  //
  let items: string | null = ''

  try {
    if (updateLocalStorage) {
      console.log('Init - updateLocStor flag = TRUE')
      throw null
    }
    items = localStorage.getItem(dbPrefix + apiSuffix)
    if (items === null) throw null
    if (items !== '') {
      console.log('Init ', apiSuffix, ' - LocStor GOOD')
      setItems(JSON.parse(items))
    } else {
      console.log('Init ', apiSuffix, ' - LocStor error - empty response')
    }
  } catch {
    console.log('Init ', apiSuffix, ' catch-api >>> go fetch DB')

    const args: FetchArgs = {
      method: 'POST',
      apiSuffix: apiSuffix,
      title: 'get' + apiSuffix,
      body: JSON.stringify({
        mode: 'get',
        dbPrefix: dbPrefix
      }),
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
