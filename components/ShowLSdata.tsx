import stylesH from '../styles/Home.module.css'
import styles from './Table.module.scss'
import { AppContext } from './AppContext'
import { useContext } from 'react'

type TableProps = {
  resData: Record<string, number | string | Date | null>[]
}

export default function ShowLSdata(props: TableProps) {
  const c = useContext(AppContext)
  const keys = Object.keys(props.resData[0])
  return <div className={stylesH.flexColumnContainer}>{props.resData}</div>
}
