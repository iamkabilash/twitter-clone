import { getProviders, signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

function LoginPage({ providers }) {
  const router = useRouter();
  const { data, status } = useSession();
  // console.log({ data, status });
  if (status === "loading") {
    return "";
  }
  if (data) {
    router.push("/");
  }
  return (
    <div className="flex items-center justify-center h-screen">
      {Object.values(providers).map((provider) => (
        <div key={provider.id}>
          <button
            onClick={async () => {
              await signIn(provider.id);
            }}
            className="flex flex-row gap-[5px] items-center bg-twitterWhite px-5 py-2 text-black rounded-full"
          >
            <img src="/icon-google.svg" alt="google-logo" className="h-8" />
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export default LoginPage;

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: { providers },
  };
}
