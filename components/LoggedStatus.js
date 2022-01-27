import { useSession, signIn, signOut } from "next-auth/react";
import styles from "../styles/Home.module.css";

export default function LoggedStatus() {
  const { data: session } = useSession();
  console.log("---------- GOO session ------------", session);
  return session ? (
    <>
      Signed in as <b>{session.user.name}</b>
      <button onClick={() => signOut()} className={styles.logoutButton}>
        {" "}
        Sign out{" "}
      </button>
    </>
  ) : (
    <>
      Not signed in
      <button onClick={() => signIn()} className={styles.loginButton}>
        {" "}
        LogIn with your Google account{" "}
      </button>
    </>
  );
}
