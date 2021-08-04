import { connectToDatabase, PAGINATION_SIZE } from "utils/mongodb";

// get all movies data
export default async (req, res) => {
  const { db } = await connectToDatabase();
  if (
    req.query.term === "" ||
    req.query.term === null ||
    req.query.term === undefined
  ) {
    const movies = await db
      .collection("movies")
      .find({})
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
  } else {
    const movies = await db
      .collection("movies")
      .aggregate(
        [
          {
            $search: {
              search: {
                query: req.query.term,
                path: ["title", "plot"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              plot: 1,
              poster: 1,
              genres: 1,
              languages: 1,
              year: 1,
              imdb: 1,
              likers: 1,
            },
          },
          {
            $skip: (req.query.page - 1) * PAGINATION_SIZE,
          },
          {
            $limit: PAGINATION_SIZE,
          },
        ],
        // this one only for large datasets
        { allowDiskUse: true }
      )
      .toArray();
    const totalPagination_ = await db
      .collection("movies")
      .aggregate(
        [
          {
            $search: {
              search: {
                query: req.query.term,
                path: ["title", "plot"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              title: 1,
              plot: 1,
              poster: 1,
              genres: 1,
              languages: 1,
              year: 1,
              imdb: 1,
              likers: 1,
            },
          },
          {
            $count: "totalPagination",
          },
        ], // this one only for large datasets
        { allowDiskUse: true }
      )
      .toArray();

    res.json({
      totalPagination: Math.ceil(
        totalPagination_[0].totalPagination / PAGINATION_SIZE
      ),
      movies,
    });
  }
};
