import Button from "components/Button";
import type { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { CheckSquareIcon, PenIcon } from "components/icons";
import classNames from "utils/classNames";
import React, { useEffect } from "react";
import Todos from "components/Todos";
import Notes from "components/Notes";
import Modal from "components/Modal";
import { useRecoilState } from "recoil";
import { typeModalState } from "atoms/modal";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const [tab, setTab] = React.useState("notes");
  const [type, setType] = useRecoilState(typeModalState);

  useEffect(() => {
    let localTab: any = localStorage.getItem("tab");
    if (localTab.length) {
      setTab(localTab);
      setType(localTab);
    }
  }, [setType]);

  function handleTabClick(newTab: string) {
    setTab(newTab);
    setType(newTab);
    localStorage.setItem("tab", newTab);
  }

  return (
    <div className="">
      <Head>
        <title>Noto App</title>
        <meta
          name="description"
          content="Notes and todo taking web application"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal />

      <main className="p-4">
        <div className="border-b pb-8 max-w-xl mx-auto">
          <div className="py-8 flex justify-between items-center w-full">
            <h1 className="text-3xl font-bold">Noto App</h1>
            {session ? (
              <img
                className="box-content h-8 w-8 rounded-full cursor-pointer border-2 border-black p-[2px]"
                src={
                  session?.user?.image ||
                  "https://d5nunyagcicgy.cloudfront.net/external_assets/hero_examples/hair_beach_v391182663/original.jpeg"
                }
                alt="profile pic"
                onClick={() => signOut()}
              />
            ) : (
              <Button onClick={() => signIn()}>Sign In</Button>
            )}
          </div>
          <p className="text-slate-500 font-medium">
            Notes + Todo taking application built with Next.js
          </p>
        </div>
        <div className="py-8 border-b max-w-xl mx-auto flex items-center justify-center gap-4">
          <button
            className={classNames(
              "box-content flex items-center gap-3 px-4 py-2 text-lg font-medium rounded-lg",
              tab === "notes"
                ? "bg-black text-white"
                : "text-slate-500 hover:bg-slate-100"
            )}
            onClick={() => handleTabClick("notes")}
          >
            <CheckSquareIcon />
            <p>Notes</p>
          </button>
          <button
            className={classNames(
              "box-content flex items-center gap-3 px-4 py-2 text-lg font-medium rounded-lg",
              tab === "todos"
                ? "bg-black text-white"
                : "text-slate-500 hover:bg-slate-100"
            )}
            onClick={() => handleTabClick("todos")}
          >
            <PenIcon />
            <p>Todos</p>
          </button>
        </div>
        <div className="py-8 max-w-xl mx-auto">
          {tab === "notes" ? <Notes /> : <Todos />}
        </div>
      </main>
    </div>
  );
};

export default Home;
