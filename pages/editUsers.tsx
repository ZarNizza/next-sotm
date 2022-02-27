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
  uid: number
  uname: string
  uphone: string | null
  gooid: string | null
  timezone: string | null
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[] | []>([])
  const [currentUser, setCurrentUser] = useState<User>({
    uid: 0,
    uname: '',
    uphone: '',
    gooid: '',
    timezone: ''
  })
  const [updateFlag, setUpdateFlag] = useState(0)

  function setUpdF() {
    setUpdateFlag(() => 1)
    setCurrentUser({ uid: 0, uname: '', uphone: '', gooid: '', timezone: '' })
    return alert(
      'OK, Updated!\nTo refresh UserList clear input area - press button (X).'
    )
  }
  function cancelFlag() {
    return setCurrentUser({
      uid: 0,
      uname: '',
      uphone: '',
      gooid: '',
      timezone: ''
    })
  }
  //
  function uInit() {
    const args: FetchArgs = {
      method: 'GET',
      apiSuffix: 'users',
      title: 'getUser',
      setResData: setUsers
    }
    fetchHandler(args)
  }

  useEffect(() => {
    uInit()
  }, [])

  useEffect(() => {
    if (updateFlag === 1) {
      uInit()
      setUpdateFlag(() => 0)
    }
  }, [updateFlag])

  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Users: {users.length}</h2>
          <UserSelect
            users={users}
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setUsers={setUsers}
            mode="new"
          />
          {currentUser.uid === 0 ? (
            ''
          ) : (
            <UserEditForm
              userToEdit={
                users.filter((item: User) => {
                  return item.uid === Number(currentUser.uid)
                })[0]
              }
              setUpdateFlag={setUpdF}
              cancelFlag={cancelFlag}
            />
          )}

          <div>
            {
              users === undefined || users.length === 0 ? (
                <p>No data - empty result</p>
              ) : users.length > 20 ? (
                <p>.. long items list, see it on Sys page</p>
              ) : (
                <DBshortTable resData={users} />
              )
              // <DBshortTable resData={users} target="users" />
            }
          </div>

          {/* <div>
            {users === undefined || users.length === 0 ? (
              <p>No data - empty result</p>
            ) : (
              <DBshort_ED_Table resData={users} target="users" />
            )}
          </div> */}
        </main>
      </div>
    </Layout>
  )
}

export default Home
