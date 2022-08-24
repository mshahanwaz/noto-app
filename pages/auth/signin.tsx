import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Button from "components/Button";

const SignIn = ({ providers }: any) => {
  return (
    <>
      {Object.values(providers).map((provider: any) => (
        <div key={provider.name}>
          <Button onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
            Sign in with {provider.name}
          </Button>
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
