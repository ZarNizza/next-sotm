import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Layout from "../components/layout";

export interface Product {
  pid: number;
  pname: string;
  psymbol: string | null;
}

const Home: NextPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((res: { data: Product[] }) => {
        setProducts(res.data || []);
      })
      .catch((error) =>
        console.log("! frontend fetch error - ", error.message)
      );
  }, []);

  return (
    <Layout>
      <Head>
        <title>Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Products:</h2>
          <ul>
            {products.map((product: Product) => (
              <li key={product.pid}>
                {product.pname}
                {" : "}
                {product.psymbol}
              </li>
            ))}
          </ul>
        </main>
      </div>
    </Layout>
  );
};

export default Home;
