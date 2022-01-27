import type { NextPage } from "next";
// import type { AppProps } from "next/app";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import Link from "next/link";

import { useSession } from "next-auth/react";

import HomeAlone from "../components/HomeAlone";
import HomeNobody from "../components/HomeNobody";

const Home: NextPage = () => {
  const { data: session } = useSession();
  return session ? <HomeAlone /> : <HomeNobody />;
};

export default Home;
