import React, { useEffect } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { GoogleIcon } from "components/icons";
import Head from "next/head";

const SignIn = ({ providers }: any) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== "unauthenticated") {
      router.replace("/");
    }
  }, [session, router]);

  if (session.status !== "unauthenticated") {
    return <div className="bg-gray-50 dark:bg-gray-900" />;
  }

  return (
    <div className="pb-20 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 h-screen flex flex-col items-center justify-center">
      <Head>
        <title>Login</title>
      </Head>
      <h1 className="text-3xl font-bold">Noto App</h1>
      <p className="text-md font-medium text-gray-600 dark:text-gray-400 mt-4 mb-8">
        Lightweight Notes + Todo taking web application
      </p>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name} className="flex flex-col gap-2">
          <CustomButton
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            <GoogleIcon />
            <span className="ml-2">Sign in with {provider.name}</span>
          </CustomButton>
        </div>
      ))}
    </div>
  );
};

export default SignIn;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}

const CustomButton = ({ onClick, children }: any) => (
  <button
    className="text-gray-50 bg-gray-900 dark:text-gray-900 dark:bg-gray-50 px-4 py-2 inline-flex items-center justify-center rounded-lg font-medium"
    onClick={onClick}
  >
    {children}
  </button>
);
