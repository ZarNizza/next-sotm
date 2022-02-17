import { Dispatch, SetStateAction } from 'react'
import { Customer } from '../pages/add'
type FetchArgs = {
  apiSuffix: string
  title: string
  body?: string
  setResData: Dispatch<SetStateAction<Customer[]>>
}

export default function fetchHandler(args: FetchArgs) {
  fetch(
    '/api/' + args.apiSuffix,
    args.body ? { method: 'POST', body: args.body } : {}
  )
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        alert(args.apiSuffix + ': ' + args.title + ' ERROR:' + res.error)
      } else {
        // console.log('>>>>>>>>> resData=', res.data)
        if (res.data !== undefined && res.data !== 'OK')
          args.setResData(() => res.data)
      }
    })
    .catch((error) =>
      alert(
        '! ' + args.apiSuffix + ': ' + args.title + ' error - ' + error.message
      )
    )
}
