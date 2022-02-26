import { Dispatch, SetStateAction } from 'react'
import { Eitem } from '../pages/minus'
import { Customer, Product, Sale } from '../pages/plus'
export type FetchArgs = {
  method: 'GET' | 'POST'
  apiSuffix: string
  title: string
  body?: string
  setResData:
    | Dispatch<SetStateAction<[] | Sale[]>>
    | Dispatch<SetStateAction<[] | Product[]>>
    | Dispatch<SetStateAction<[] | Eitem[]>>
    | Dispatch<SetStateAction<Customer[]>>
    | Dispatch<SetStateAction<number>>
}

export default function fetchHandler(arg: FetchArgs) {
  fetch(
    '/api/' + arg.apiSuffix,
    arg.body ? { method: arg.method, body: arg.body } : {}
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        alert(arg.apiSuffix + ': ' + arg.title + ' ERROR:' + res.error)
      } else {
        // console.log('>>>>>>>>> resData=', res.data)
        if (res.data !== undefined && res.data !== 'OK')
          arg.setResData(() => res.data)
      }
    })
    .catch((error) =>
      alert(
        '! ' + arg.apiSuffix + ': ' + arg.title + ' error - ' + error.message
      )
    )
}
