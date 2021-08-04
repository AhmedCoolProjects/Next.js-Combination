import Image from "next/image";
import { Favorite, FavoriteBorder } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { APP_URL } from "utils/urls";
import { useState } from "react";

const user_email = "ahmed.bargady";

function SingleMovieItem({ movie }) {
  const [isFavorite, setIsFavorite] = useState(
    movie.likers?.includes(user_email)
  );

  const handleChangeFavorite = async (e) => {
    e.preventDefault();
    console.log("movie.likers: ", movie.likers);
    setIsFavorite(!isFavorite);
    await fetch(
      `${APP_URL}/api/movies/addfavorite?movieid=${movie._id}&uemail=${user_email}`
    ).then((res) => res.json());
  };
  return (
    <div className="flex relative flex-col p-2 space-y-3 border-2 border-blue-300 ">
      <IconButton
        style={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
        onClick={handleChangeFavorite}>
        {isFavorite ? (
          <Favorite className="text-red-600" />
        ) : (
          <FavoriteBorder className="text-red-600" />
        )}
      </IconButton>

      {movie.poster && (
        <div className="w-full h-32 flex flex-row items-start justify-start relative ">
          <Image
            src={movie.poster}
            alt={movie.title}
            layout="fill"
            objectFit="contain"
            className="h-full"
          />
        </div>
      )}
      <h1>title: {movie.title}</h1>
      <h1>year: {movie.year}</h1>
      <p>short plot: {movie.plot}</p>
      <strong>Rating: {movie.imdb?.rating}</strong>
      <strong>votes: {movie.imdb?.votes}</strong>
      <h1>
        genre:{" "}
        {movie.genres?.map((gnr_, index) => (
          <strong key={(gnr_, index)}>{gnr_}, </strong>
        ))}
      </h1>
      <h1>
        languages:{" "}
        {movie.languages?.map((lng_, index) => (
          <strong key={(lng_, index)}>{lng_}, </strong>
        ))}
      </h1>
    </div>
  );
}

function DashboardMovies({ movies }) {
  return (
    <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-2 ">
      {movies?.map((movie) => (
        <SingleMovieItem key={movie._id} movie={movie} />
      ))}
    </div>
  );
}

export default DashboardMovies;
