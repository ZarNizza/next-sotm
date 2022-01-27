import type { NextPage } from "next";
// import type { AppProps } from "next/app";
import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
// import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import LoggedStatus from "../components/LoggedStatus";

const Home: NextPage = () => {
  function guestLoginHandler() {
    console.log("------------- LoginButton ---------");
  }

  return (
    <Layout>
      <Head>
        <title>SOTM Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <h2>be Happy!</h2>

        <main className={styles.main}>
          <h3>
            Welcome to <span style={{ color: "#d0d" }}>beHappy!</span>
            SalesOnTheMove
          </h3>
          <p>
            This app help you keep in-order your incomes & payments. <br />
            Just write every event here. <br />
            You can get statistics at any time!
          </p>
          <div className={styles.loginForm}>
            <LoggedStatus />
          </div>
        </main>

        <footer className={styles.footer}>
          <Link href="/home">
            <a className={styles.footerLink}>HomePage &gt;&gt;</a>
          </Link>{" "}
          <span> Samara, 2022 </span>
          <Link href="/sys">
            <a className={styles.footerLink}>SystemPage &gt;&gt;</a>
          </Link>
        </footer>
      </div>
    </Layout>
  );
};

export default Home;
