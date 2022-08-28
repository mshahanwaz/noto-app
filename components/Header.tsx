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
    <div className="px-4">
      <div className="pb-8 max-w-xl mx-auto text-gray-900 dark:text-gray-50">
        <div className="py-8 flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold">Noto App</h1>
          {session ? (
            <img
              className="box-content h-8 w-8 rounded-full cursor-pointer border-2 border-gray-900 dark:border-gray-50 p-[3px]"
              src={session?.user?.image || ""}
              alt="profile pic"
              onClick={() => signOut()}
            />
          ) : (
            <Button onClick={() => signIn()}>Sign In</Button>
          )}
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">
          Lightweight notes + todo taking application built with{" "}
          <a
            className="text-black dark:text-white hover:underline"
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
        "box-content flex items-center gap-3 px-4 py-2 text-lg font-medium rounded-lg transition-all",
        activeType === type
          ? "bg-gray-800 text-gray-50 dark:bg-gray-50 dark:text-gray-900"
          : "text-gray-600 bg-gray-200 hover:bg-gray-300 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
      )}
      onClick={() => onClick(activeType)}
    >
      {children}
    </button>
  );
};
