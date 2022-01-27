import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";

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
          <div className={styles.login}>
            <button onClick={guestLoginHandler} className={styles.loginButton}>
              LogIn with your Google account
            </button>
            <button onClick={guestLoginHandler} className={styles.guestButton}>
              LogIn as Guest
            </button>
          </div>
        </main>

        <footer className={styles.footer}>Samara, 2022</footer>
      </div>
    </Layout>
  );
};

export default Home;
