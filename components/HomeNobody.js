import LoggedStatus from "../components/LoggedStatus";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "./layout";

export default function HomeNobody() {
  return (
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
}
