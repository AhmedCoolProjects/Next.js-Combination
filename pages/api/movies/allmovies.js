import { connectToDatabase, PAGINATION_SIZE } from "utils/mongodb";

// get all movies data
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const movies = await db
    .collection("movies")
    .find({})
    .sort({ metacritic: -1 })
    .skip(PAGINATION_SIZE * (req.query.page - 1))
    .limit(PAGINATION_SIZE)
    .project({
      _id: 1,
      year: 1,
      title: 1,
      plot: 1,
      genres: 1,
      poster: 1,
      languages: 1,
      imdb: 1,
      likers: 1,
    })
    .toArray();
  const totalPagination_ = await db.collection("movies").count();
  res.json({
    totalPagination: Math.ceil(totalPagination_ / PAGINATION_SIZE),
    movies,
  });
};
