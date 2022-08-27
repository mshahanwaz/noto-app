import type { NextPage } from "next";
import Head from "next/head";
import Modal from "components/Modal";
import Header from "components/Header";
import Docs from "components/Docs";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { useRecoilState } from "recoil";
import { userDocState } from "atoms/userDoc";
import ReadModal from "components/ReadModal";

const Home: NextPage = () => {
  const { data: session, status }: any = useSession();
  const router = useRouter();
  const [userDoc, setUserDoc] = useRecoilState(userDocState);

  useEffect(() => {
    return () => {
      if (session) {
        setUserDoc((userDoc: any) => ({
          uid: session?.user?.uid,
          user: {
            ...session?.user,
          },
          ...userDoc,
        }));
        ["notes", "todos"].forEach(async (type: string) => {
          const collectionRef = collection(
            db,
            "users",
            session?.user?.uid,
            type
          );
          const collectionQuery = query(
            collectionRef,
            orderBy("timestamp", "desc")
          );
          await onSnapshot(collectionQuery, (snapshot) => {
            setUserDoc((userDoc: any) => ({
              [type]: snapshot?.docs.map((doc) => doc.data()),
              ...userDoc,
            }));
          });
          await setDoc(doc(db, "users", session?.user?.uid), {
            ...session?.user,
          });
        });
      }
    };
  }, [session, setUserDoc]);

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
      <ReadModal />
    </div>
  );
};

export default Home;
