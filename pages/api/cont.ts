import type { NextApiRequest, NextApiResponse } from 'next'
import { useState } from 'react'
import toast from 'react-hot-toast'

const [resData, setResData] = useState<any>()

export default function cont(mode: string) {
  //
  function sys_handler(url: string, method: 'GET' | 'POST', body: string) {
    const toast01 = toast.loading('Loading...')

    fetch(url, { method: 'GET' })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          toast.remove()
          toast.error('!Loading error: X3')
          console.log('SYS: ' + res.error)
        } else {
          console.log('result: ', res.data)
          toast.remove()
        }
        if (res.data !== undefined && res.data !== 'OK')
          setResData(() => res.data)
      })
      .catch((error) => {
        toast.remove()
        toast.error('!Loading error: X3')
        console.log('! error - ' + error.message)
      })
  }

  switch (mode) {
    case 'getCode': {
      console.log('getCode')
      const url =
        'https://accounts.google.com/o/oauth2/v2/auth' +
        '?scope=https://www.google.com/m8/feeds&access_type=offline' +
        '&include_granted_scopes=true&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code' +
        '&client_id=' +
        process.env.GOOGLE_ID
      const body = ''
      sys_handler(url, 'GET', body)
      break
    }

    case 'getTokens': {
      // code=4/iLcXnhpU8NvMHT5aTy8JjXhcROERzkvKq********&client_id=921647******-l5jcha3bt7r6q******bhtsgk*****um6.apps.googleusercontent.com&client_secret=hi1W9GAKGer************&redirect_uri=urn:ietf:wg:oauth:2.0:oob&grant_type=authorization_code
      break
    }

    case 'getContacts': {
      break
    }

    case 'updateToken': {
      break
    }
    default: {
    }
  }

  return
}
