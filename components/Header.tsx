import { signIn, signOut, useSession } from "next-auth/react";
import { CheckSquareIcon, PenIcon } from "components/icons";
import classNames from "utils/classNames";
import Button from "components/Button";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { typeModalState } from "atoms/modal";
import Gradient from "./Gradient";

const Header = () => {
  const { data: session } = useSession();
  const [type, setType] = useRecoilState(typeModalState);

  useEffect(() => {
    let localType: any = localStorage.getItem("tab");
    setType(localType || "notes");
  }, [setType]);

  function handleType(type: string) {
    setType(type);
    localStorage.setItem("tab", type);
  }

  return (
    <div className="px-4 dark:bg-grey">
      <div className="pb-8 max-w-xl mx-auto dark:text-white">
        <div className="py-8 flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold">Noto App</h1>
          {session ? (
            <img
              className="box-content h-8 w-8 rounded-full cursor-pointer border-2 border-black dark:border-white p-[3px]"
              src={session?.user?.image || "/avatar.png"}
              alt="profile pic"
              onClick={() => signOut()}
            />
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </div>
        <p className="text-slate-500 dark:text-grey-light font-medium">
          Lightweight notes + todo taking application built with{" "}
          <a
            className="text-blue-600 dark:text-blue-light underline"
            href="https://nextjs.org/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Next.js
          </a>
        </p>
      </div>

      <Gradient />

      <div className="py-8 max-w-xl mx-auto flex items-center justify-center gap-4">
        <CustomButton activeType="notes" onClick={handleType}>
          <PenIcon />
          <p>Notes</p>
        </CustomButton>
        <CustomButton activeType="todos" onClick={handleType}>
          <CheckSquareIcon />
          <p>Todos</p>
        </CustomButton>
      </div>

      <Gradient />
    </div>
  );
};

export default Header;

const CustomButton = ({ children, activeType, onClick }: any) => {
  const [type, setType] = useRecoilState(typeModalState);

  return (
    <button
      className={classNames(
        "box-content flex items-center gap-3 px-4 py-2 text-lg font-medium rounded-lg",
        activeType === type
          ? "bg-black text-white dark:bg-white dark:text-black"
          : "text-slate-500 dark:text-grey-light hover:bg-slate-100 dark:hover:bg-black"
      )}
      onClick={() => onClick(activeType)}
    >
      {children}
    </button>
  );
};
