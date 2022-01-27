import type { NextPage } from "next";
// import type { AppProps } from "next/app";
import Head from "next/head";
// import Image from "next/image";
import Link from "next/link";
// import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";
import { useSession } from "next-auth/react";
import LoggedStatus from "../components/LoggedStatus";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return session ? (
    <Layout>
      <Head>
        <title>SOTM Next App</title>
      </Head>
      <main className={styles.main}>
        <h3>Welcome!</h3>
      </main>
    </Layout>
  ) : (
    <Layout>
      <Head>
        <title>SOTM Next App</title>
      </Head>
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
    </Layout>
  );
};

export default Home;
