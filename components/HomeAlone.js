import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "./layout";

export default function HomeAlone() {
  return (
    <Layout>
      <Head>
        <title>SOTM Next App</title>
      </Head>
      <main className={styles.main}>
        <div className={styles.row}>
          <div className={styles.square_plus}>
            <p> + </p>
          </div>{" "}
          <div className={styles.square0}>
            <div className={styles.halfsquare_top}>
              <p>memo</p>
            </div>
            <div className={styles.halfsquare_bottom}>
              <p> - </p>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.square_stat}>
            <p>=</p>
          </div>{" "}
          <div className={styles.square_sys}>
            <p> Sys </p>
          </div>{" "}
        </div>
      </main>
    </Layout>
  );
}
