import styles from "./layout.module.css";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.flexContainer}>
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
