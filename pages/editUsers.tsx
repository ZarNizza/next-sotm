import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import Layout from '../components/layout'
import fetchHandler, { FetchArgs } from '../components/fetchHandler'
import UserSelect from '../components/UserSelect'
import UserEditForm from '../components/UserEditForm'
import DBshortTable from '../components/DBshortTable'

export type User = {
  id: number
  name: string
  phone: string | null
  gooid: string | null
  timezone: string | null
}

const Home: NextPage = () => {
  const user0 = {
    id: 0,
    name: '',
    phone: '',
    gooid: '',
    timezone: ''
  }
  const [users, setUsers] = useState<User[] | []>([])
  const [currentUser, setCurrentUser] = useState<User>(user0)
  const [updateFlag, setUpdateFlag] = useState(0)
  const [showTableFlag, setShowTableFlag] = useState(false)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentUser(() => user0)
    return alert(
      'OK, Updated!\n\nTo refresh UsersList clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentUser(() => user0)
  }
  function setShowTableHandler() {
    setShowTableFlag(() => !showTableFlag)
  }
  //
  function userInit() {
    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: 'users',
      title: 'getUsers',
      setResData: setUsers
    }
    fetchHandler(args)
  }

  useEffect(() => {
    userInit()
  }, [])

  useEffect(() => {
    if (updateFlag === 1) {
      userInit()
      setUpdateFlag(() => 0)
    }
  }, [updateFlag])

  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.flexColumnContainer}>
          <h2>Users: {users.length}</h2>
          <UserSelect
            users={users}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setUsers={setUsers}
            mode="new"
          />

          {currentUser.id === 0 ? (
            ''
          ) : (
            <UserEditForm
              userToEdit={
                users.filter((item: User) => {
                  return item.id === Number(currentUser.id)
                })[0]
              }
              setUpdateFlag={setUpdF}
              cancelFlag={cancelFlag}
            />
          )}

          <div className={styles.flexColumnContainer}>
            <button onClick={setShowTableHandler} className={styles.sysButton}>
              Show/Hide all
            </button>
            {showTableFlag ? (
              users === undefined || users.length === 0 ? (
                <p>No data - empty result</p>
              ) : (
                <div className={styles.tableScroll}>
                  <DBshortTable resData={users} />
                </div>
              )
            ) : (
              <></>
            )}
          </div>
        </div>
      </main>
    </Layout>
  )
}

export default Home
