import { useEffect, useState } from 'react'
import type { Customer } from '../pages/add'
import styles from './CustomerSelect.module.scss'

export default function CustomerSelect(props: any) {
  const [searchTerm, setSearchTerm] = useState('')
  const csInput: HTMLInputElement | null = document.getElementById(
    'cSearchInput'
  ) as HTMLInputElement
  const csResultsList = document.getElementById('cSearchResultsList')

  useEffect(() => {
    if (csResultsList !== null) {
      csResultsList.innerHTML = ''
      props.customers
        .filter((item: Customer) => {
          return item.cname.toLowerCase().includes(searchTerm)
        })
        .forEach((item: Customer) => {
          const opt = new Option(item.cname, String(item.cid))
          csResultsList.appendChild(opt)
        })
    }
  }, [searchTerm])

  function liveSearch(e: any) {
    const st = e.target.value.toLowerCase()
    setSearchTerm(() => st)
    props.setCurrentCustomer(() => 0)
  }

  function liveST(e: any) {
    const indexST = e.target.value
    const st = props.customers.filter((item: Customer) => {
      return item.cid === Number(indexST)
    })
    if (st.length === 1) {
      props.setCurrentCustomer(() => [Number(st[0].cid), st[0].cname])
      if (csInput !== null) csInput.value = st[0].cname
    }
  }

  return (
    <div className={styles.custList}>
      <p>
        <div className={styles.title}>Customer</div>
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
          hidden={searchTerm === '' || props.currentCustomer[0] > 0}
        ></select>
      </p>
    </div>
  )
}
