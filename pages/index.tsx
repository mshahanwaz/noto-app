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
import { HotKeys } from "react-hotkeys";
import { useRecoilState } from "recoil";
import { openModal, typeModalState } from "atoms/modal";

const Home: NextPage = () => {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const [open, setOpen] = useRecoilState(openModal);
  const [type, setType] = useRecoilState(typeModalState);

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
    return <div className="bg-gray-50 dark:bg-gray-900" />;
  }

  const keyMap = {
    TOGGLE_MODAL: "ctrl+k",
    TOGGLE_TAB: "ctrl+l",
  };

  const handlers = {
    TOGGLE_MODAL: (e: any) => {
      e.preventDefault();
      setOpen((open) => !open);
    },
    TOGGLE_TAB: (e: any) => {
      e.preventDefault();
      setType((type) => {
        let toggle = type === "notes" ? "todos" : "notes";
        localStorage.setItem("tab", toggle);
        return toggle;
      });
    },
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Head>
          <title>Noto App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header />
        <Docs />

        <Modal />
        <ReadModal />
      </div>
    </HotKeys>
  );
};

export default Home;
