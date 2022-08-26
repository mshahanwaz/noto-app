import React, { useEffect } from "react";
import { getProviders, signIn, useSession } from "next-auth/react";
import Button from "components/Button";
import { useRouter } from "next/router";
import { GoogleIcon } from "components/icons";

const SignIn = ({ providers }: any) => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status !== "unauthenticated") {
      router.replace("/");
    }
  }, [session, router]);

  if (session.status !== "unauthenticated") {
    return <div className="dark:bg-grey" />;
  }

  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div
          key={provider.name}
          className="pb-20 dark:bg-grey dark:hover:bg-black h-screen flex flex-col items-center justify-center dark:text-white"
        >
          <h1 className="text-3xl font-bold">Noto App</h1>
          <p className="text-md font-md text-slate-500 dark:text-grey-light mt-4 mb-8">
            Lightweight Notes + Todo taking web application
          </p>
          <CustomButton
            onClick={() => signIn(provider.id, { callbackUrl: "/" })}
          >
            <GoogleIcon />
            <span className="ml-2">Sign in with {provider.name}</span>
          </CustomButton>
        </div>
      ))}
    </>
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
    className="text-white bg-black dark:text-black dark:bg-white px-4 py-2 flex items-center justify-center rounded-lg font-medium"
    onClick={onClick}
  >
    {children}
  </button>
);
