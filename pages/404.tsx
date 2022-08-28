import { ArrowLeftIcon } from "components/icons";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen w-full dark:bg-black dark:text-white flex flex-col justify-center items-center gap-4 overflow-hidden">
      <Head>
        <title>Page Not Found</title>
      </Head>
      <h1 className="text-[10rem] font-extrabold">404</h1>
      <Link href="/">
        <a className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black font-medium rounded-lg inline-flex items-center gap-2">
          <ArrowLeftIcon />
          Go to home
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
