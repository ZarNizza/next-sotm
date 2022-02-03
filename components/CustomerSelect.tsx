import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function CustomerSelect(props) {
  const [searchTerm, setSearchTerm] = useState('')
  const csInput: HTMLInputElement | null = document.getElementById(
    'cSearchInput'
  ) as HTMLInputElement
  const csResultsList = document.getElementById('cSearchResultsList')

  useEffect(() => {
    if (csResultsList !== null) {
      csResultsList.innerHTML = ''
      props.customers
        .filter((item) => {
          return item.cname.toLowerCase().includes(searchTerm)
        })
        .forEach((e) => {
          const opt = new Option(e.cname, String(e.cid))
          csResultsList.appendChild(opt)
        })
    }
  }, [searchTerm])

  function liveSearch(e: any) {
    const st = e.target.value.toLowerCase()
    setSearchTerm(() => st)
    // setCurrentCustomer(() => 0)
  }

  function liveST(e: any) {
    const indexST = e.target.value
    const st = props.customers.filter((item) => {
      return item.cid === Number(indexST)
    })
    // console.log('liveST filtered, lenght=', st.length, st[0].cname, st)
    if (st.length === 1) {
      console.log('setCurrCust ', st[0].cid, st[0].cname)
      props.setCurrentCustomer(() => Number(st[0].cid))
      if (csInput !== null) csInput.value = st[0].cname
    }
  }

  return (
    <div className={styles.custList}>
      <p>Select Customer</p>
      <p>
        <input
          type="search"
          id="cSearchInput"
          placeholder="Search for a Customer"
          onChange={liveSearch}
          className={styles.inputCust}
        />
      </p>
      <p>
        <select
          id="cSearchResultsList"
          size={4}
          onChange={liveST}
          hidden={searchTerm === ''}
        ></select>
      </p>
    </div>
  )
}
