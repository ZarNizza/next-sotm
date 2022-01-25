import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";

const Home: NextPage = () => {
  function resetUsersHandler() {
    fetch("/api/sys", { method: "POST", body: "reset_Users" })
      .then((res) => res.json())
      .then((res) => {
        console.log("DB-reset = OK", res);
      });
  }
  function restoreSalesHandler() {
    fetch("/api/sys", { method: "POST", body: "restSales" })
      .then((res) => res.json())
      .then((res) => {
        console.log("restSales = OK", res);
      });
  }
  function restoreCustHandler() {
    fetch("/api/sys", { method: "POST", body: "restCust" })
      .then((res) => res.json())
      .then((res) => {
        console.log("restCust = OK", res);
      });
  }
  function showTablesHandler() {
    fetch("/api/sys", { method: "POST", body: "showTables" })
      .then((res) => res.json())
      .then((res) => {
        console.log("showTables = OK", res);
      });
  }

  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>System page</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
          <div className={styles.sysButton}>
            <button onClick={resetUsersHandler}>! reset Users table !</button>
          </div>
          <div className={styles.sysButton}>
            <button onClick={restoreSalesHandler}>restore SALES table</button>
          </div>
          <div className={styles.sysButton}>
            <button onClick={restoreCustHandler}>restore CUST table</button>
          </div>
          <div className={styles.sysButton}>
            <button onClick={showTablesHandler}>SHOW TABLES</button>
          </div>
        </main>

        <footer className={styles.footer}>
          <Link href="/">&lt;&lt; Back to the Future</Link>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
