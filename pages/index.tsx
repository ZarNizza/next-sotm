import type { NextPage } from "next";
import { useSession } from "next-auth/react";

import WelcomeHome from "../components/WelcomeHome";
import NobodyHome from "../components/NobodyHome";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return session ? <WelcomeHome /> : <NobodyHome />;
};

export default Home;
