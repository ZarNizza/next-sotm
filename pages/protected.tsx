import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Home.module.css";

const Home2: NextPage = () => {
  const { status } = useSession();
  if (status !== "authenticated") return <div>You Are Not Authorised</div>;
  return (
    <Layout>
      <Head>
        <title>Settings</title>
      </Head>
      <main className={styles.main}>
        <h3>Settings page</h3>
      </main>
    </Layout>
  );
};

export default Home2;
