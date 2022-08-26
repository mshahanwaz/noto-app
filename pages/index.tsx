import type { NextPage } from "next";
import Head from "next/head";
import Modal from "components/Modal";
import Header from "components/Header";
import Docs from "components/Docs";

const Home: NextPage = () => {
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

      <Modal />

      <Header />

      <main className="px-4 py-8 max-w-xl mx-auto min-h-screen">
        <Docs />
      </main>
    </div>
  );
};

export default Home;
