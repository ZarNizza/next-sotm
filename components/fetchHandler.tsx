import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import { User } from '../pages/editUsers'
import { Eitem, Xpense } from '../pages/minus'
import { Customer, Product, Sale } from '../pages/plus'

export type FetchArgs = {
  method: 'GET' | 'POST'
  apiSuffix: string
  title: string
  body?: string
  setResData:
    | Dispatch<SetStateAction<[] | Customer[]>>
    | Dispatch<SetStateAction<[] | Product[]>>
    | Dispatch<SetStateAction<[] | Sale[]>>
    | Dispatch<SetStateAction<[] | Eitem[]>>
    | Dispatch<SetStateAction<[] | Xpense[]>>
    | Dispatch<SetStateAction<[] | User[]>>
    | Dispatch<SetStateAction<number>>
}

export default function fetchHandler(arg: FetchArgs) {
  const toast01 = toast.loading('Loading...')
  return fetch(
    '/api/' + arg.apiSuffix,
    arg.body ? { method: arg.method, body: arg.body } : {}
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        toast.remove()
        toast.error('!Loading error: X3')
        alert(
          'FETCH ' + arg.apiSuffix + ': ' + arg.title + ' ERROR:' + res.error
        )
      } else {
        if (res.data !== undefined && res.data !== 'OK') {
          console.log('--- fetch OK - SET res.data')
          arg.setResData(() => res.data)
          if (!arg.body) {
            localStorage.setItem(arg.apiSuffix, JSON.stringify(res.data))
          }
        }
        toast.remove()
      }
    })
    .catch((error) => {
      toast.remove()
      toast.error('!Loading error: X3')
      alert(
        '! FETCH ' +
          arg.apiSuffix +
          ': ' +
          arg.title +
          ' CATCH error - ' +
          error.message
      )
    })
}
