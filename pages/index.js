import Head from "next/head";
import Image from "next/image";
import { getSession, signIn, signOut } from "next-auth/client";
import DashboardMovies from "@comp/movies/DashboardMovies";
import { useEffect, useState } from "react";
import { APP_URL } from "utils/urls";
import { Pagination } from "@material-ui/lab";

export default function Home({ session, movies, totalPagination }) {
  const [moviesList, setMoviesList] = useState(movies);
  const [textSearch, setTextSearch] = useState("");
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(totalPagination);
  useEffect(() => {
    async function fetchMovies() {
      if (textSearch === "" && actualPage === 1) {
        setMoviesList(movies);
        setTotalPages(totalPagination);
      } else {
        await fetch(
          `${APP_URL}/api/movies/searchmovie?term=${textSearch}&page=${actualPage}`
        )
          .then((response) => response.json())
          .then(({ movies, totalPagination }) => {
            setMoviesList(movies);
            setTotalPages(totalPagination);
          });
      }
    }
    fetchMovies();
  }, [textSearch, actualPage]);
  return (
    <div className="grid grid-cols-1 gap-6">
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
      <input
        type="text"
        className="p-4 bg-transparent border-2 border-blue-300 text-base"
        value={textSearch}
        onChange={(e) => setTextSearch(e.target.value)}
        placeholder="Search in more than 23,530 movies from mongodb database"
      />
      <div className="w-full relative items-center flex flex-row">
        <Pagination
          count={totalPages}
          page={actualPage}
          onChange={(e, v) => setActualPage(v)}
          shape="rounded"
          size="large"
        />
      </div>
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
      {moviesList && <DashboardMovies movies={moviesList} />}
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  const { totalPagination, movies } = await fetch(
    `${process.env.APP_URL}/api/movies/allmovies?page=1`
  ).then((response) => response.json());
  return {
    props: { totalPagination, movies, session },
  };
}
