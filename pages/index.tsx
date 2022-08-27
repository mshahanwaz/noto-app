import type { NextPage } from "next";
import Head from "next/head";
import Modal from "components/Modal";
import Header from "components/Header";
import Docs from "components/Docs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import ReadModal from "components/ReadModal";

const Home: NextPage = () => {
  const { data: session, status }: any = useSession();
  const router = useRouter();

  useEffect(() => {
    async function putUser() {
      await setDoc(doc(db, "users", session?.user?.uid), {
        ...session?.user,
      });
    }
    if (session) {
      putUser();
    }
  }, [session]);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/auth/signin");
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return null;
  } else if (status === "loading") {
    return <div className="dark:bg-grey" />;
  }

  return (
    <div className="dark:bg-grey min-h-screen">
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
      <ReadModal />
    </div>
  );
};

export default Home;
