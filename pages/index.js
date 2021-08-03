import Head from "next/head";
import Image from "next/image";
import { getSession, signIn, signOut } from "next-auth/client";

export default function Home({ session }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Head>
        <title>Create Next App</title>
      </Head>
      <button
        onClick={
          session
            ? (e) => {
                e.preventDefault();
                signOut();
              }
            : (e) => {
                e.preventDefault();
                signIn();
              }
        }>
        {session ? "SingOut" : "SingIn"}
      </button>
      {session && (
        <div className="space-y-4">
          <h1>{session.user.name}</h1>
          <h1>{session.user.email}</h1>
          <Image
            className="rounded-full"
            src={session.user.image}
            alt="image user"
            width={100}
            height={100}
          />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: { session },
  };
}
