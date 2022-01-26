import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import { useState } from "react";

const Home: NextPage = () => {
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  function resetUsersHandler() {
    fetch("/api/sys", { method: "POST", body: "reset_Users" })
      .then((res) => res.json())
      .then((res) => {
        console.log("SYS: DB-reset = OK", res);
      })
      .catch((error) =>
        console.log("! SYS: DB-C-reset error - ", error.message)
      );
  }
  function resetSalesHandler() {
    fetch("/api/sys", { method: "POST", body: "reset_Sales" })
      .then((res) => res.json())
      .then((res) => {
        console.log("SYS: DB-reset = OK", res);
      })
      .catch((error) =>
        console.log("! SYS: DB-S-reset error - ", error.message)
      );
  }
  function restoreSalesHandler() {
    fetch("/api/sys", { method: "POST", body: "restSales" })
      .then((res) => res.json())
      .then((res) => {
        console.log("SYS: restSales = OK", res);
      })
      .catch((error) =>
        console.log("! SYS: restSales error - ", error.message)
      );
  }
  function restoreCustHandler() {
    fetch("/api/sys", { method: "POST", body: "restCust" })
      .then((res) => res.json())
      .then((res) => {
        console.log("SYS: restCust = OK", res);
      })
      .catch((error) => console.log("! SYS: restCust error - ", error.message));
  }
  function showTablesHandler() {
    fetch("/api/sys", { method: "POST", body: "showTables" })
      .then((res) => res.json())
      .then((res) => {
        console.log("SYS: showTables = OK", res);
      })
      .catch((error) =>
        console.log("! SYS: showTables error - ", error.message)
      );
  }
  function inputUserChangeHandler(userName: string) {
    setUserName(userName);
  }
  function inputPhoneChangeHandler(userPhone: string) {
    setUserPhone(userPhone);
  }
  function addUserHandler() {
    const user = { cname: userName, cphone: userPhone };
    fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log("SYS: addUser = OK", res);
        setUserName("");
        setUserPhone("");
      })
      .catch((error) => console.log("! SYS: addUser error - ", error.message));
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
            <input
              id="userInput"
              value={userName}
              onChange={(event) => inputUserChangeHandler(event.target.value)}
              placeholder="First, last name"
              className={styles.userInput}
            />
            <input
              id="userPhone"
              value={userPhone}
              onChange={(event) => inputPhoneChangeHandler(event.target.value)}
              placeholder="+x xxx xxx xxxx"
              className={styles.userInput}
            />
            <button onClick={addUserHandler}> + Add User + </button>
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
          <div className={styles.sysButton}>
            <button onClick={resetUsersHandler}>
              ! RESET customers TABLE !
            </button>
          </div>
          <div className={styles.sysButton}>
            <button onClick={resetSalesHandler}>! RESET sales TABLE !</button>
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
