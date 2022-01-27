import Link from "next/link";
import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";

export default function Footer() {
  const { data: session } = useSession();
  return session ? (
    <div className={styles.footer}>
      <Link href="/">
        <a className={styles.footerLink}>&lt;&lt; WelcomePage </a>
      </Link>
      <Link href="/home">
        <a className={styles.footerLink}>HomePage</a>
      </Link>
      <Link href="/sys">
        <a className={styles.footerLink}>SystemPage &gt;&gt;</a>
      </Link>
    </div>
  ) : (
    <div className={styles.footer}>
      <span> Samara, 2022 </span>
    </div>
  );
}
