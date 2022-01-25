import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";

export interface User {
  id: number;
  name: string;
}

const Home: NextPage = () => {
  const [users, setUsers] = useState<string[]>([]);
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((res: { data: User[] }) => {
        console.log("res=", res);
        setUsers((res.data || []).map((el) => el.name));
      });
  }, []);

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>SOTM Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <h2>Users</h2>
          <ol>
            {users.map((user) => (
              <li>{user}</li>
            ))}
          </ol>
        </main>

        <footer className={styles.footer}>
          <Link href="/">&lt;&lt; Back to the Future</Link>{" "}
          <Link href="/sys">SystemPage &gt;&gt;</Link>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
