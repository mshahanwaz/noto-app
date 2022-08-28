import { ArrowLeftIcon } from "components/icons";
import Head from "next/head";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="h-screen w-full text-gray-900 bg-gray-50 dark:bg-gray-900 dark:text-gray-50 flex flex-col justify-center items-center gap-4 overflow-hidden">
      <Head>
        <title>Page Not Found</title>
      </Head>
      <h1 className="text-[10rem] font-extrabold">404</h1>
      <Link href="/">
        <a className="px-4 py-2 bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 font-medium rounded-lg inline-flex items-center gap-2">
          <ArrowLeftIcon />
          Go to home
        </a>
      </Link>
    </div>
  );
};

export default NotFound;
