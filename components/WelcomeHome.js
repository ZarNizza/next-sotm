import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "./layout";
import Link from "next/link";

export default function WelcomeHome() {
  return (
    <Layout>
      <Head>
        <title>Welcome Home!</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.row}>
          <Link href="/add">
            <div className={styles.square_plus}>
              <p> + </p>
            </div>
          </Link>
          <div className={styles.square0}>
            <Link href="/memo">
              <div className={styles.halfsquare_top}>
                <p>memo</p>
              </div>
            </Link>
            <Link href="/expenses">
              <div className={styles.halfsquare_bottom}>
                <p> - </p>
              </div>
            </Link>
          </div>
        </div>
        <div className={styles.row}>
          <Link href="/statistics">
            <div className={styles.square_stat}>
              <p> = </p>
            </div>
          </Link>
          <Link href="/settings">
            <div className={styles.square_sys}>
              <p> Sys </p>
            </div>
          </Link>
        </div>
      </main>
    </Layout>
  );
}