import type { NextPage } from "next";
import Head from "next/head";
import Modal from "components/Modal";
import Header from "components/Header";
import Docs from "components/Docs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const session = useSession();
  const router = useRouter();

  console.log(session);
  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [session, router]);

  if (session.status === "unauthenticated") {
    return null;
  } else if (session.status === "loading") {
    return <div className="dark:bg-grey" />;
  }

  return (
    <div className="dark:bg-grey">
      <Head>
        <title>Noto App</title>
        <meta
          name="description"
          content="Notes and todo taking web application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Docs />
      <Modal />
    </div>
  );
};

export default Home;
