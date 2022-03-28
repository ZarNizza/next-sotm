import Logo from "./Logo";
import LoggedStatus from "./LoggedStatus";
import { useSession } from "next-auth/react";
import styles from "../styles/Home.module.css";

export default function Header() {
  const { data: session } = useSession();
  return session ? (
    <div className={styles.header}>
      <Logo />
      <LoggedStatus />
    </div>
  ) : (
    <div className={styles.header}>
      <Logo />
      <span> </span>
    </div>
  );
}
