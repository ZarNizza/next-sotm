import type { NextPage } from "next";
import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";

export interface User {
  cid: number;
  cname: string;
  cphone: string | null;
  gooid: string | null;
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((res: { data: User[] }) => {
        setUsers(res.data || []);
      })
      .catch((error) =>
        console.log("! frontend fetch error - ", error.message)
      );
  }, []);

  return (
    <Layout>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Users:</h2>
          <ul>
            {users.map((user: User) => (
              <li key={user.cid}>
                {user.cname}
                {", "}
                {user.cphone} {user.gooid}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
