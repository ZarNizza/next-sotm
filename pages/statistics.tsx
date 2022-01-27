import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Statistics</title>
      </Head>
      <main className={styles.main}>
        <h3>Statistics page</h3>
      </main>
    </Layout>
  );
};

export default Home;
