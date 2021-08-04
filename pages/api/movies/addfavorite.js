import { ObjectId } from "mongodb";
import { connectToDatabase } from "utils/mongodb";

// get all movies data
export default async (req, res) => {
  const { db } = await connectToDatabase();
  // if the array exists or not
  const isLikersExist =
    (await db
      .collection("movies")
      .find({ _id: ObjectId(req.query.movieid), likers: { $exists: true } })
      .count()) > 0;
  // if likers exists
  if (isLikersExist) {
    // if user email exists there or not
    const isInLikers =
      (await db
        .collection("movies")
        .find({
          _id: ObjectId(req.query.movieid),
          likers: { $in: [req.query.uemail] },
        })
        .count()) > 0;
    // if yes
    if (isInLikers) {
      const results = await db
        .collection("movies")
        .update(
          { _id: ObjectId(req.query.movieid) },
          { $pull: { likers: req.query.uemail } }
        );
      res.json({
        isLikersExist: isLikersExist,
        isInLikers: isInLikers,
        state: "pulling",
        results,
      });
    } else {
      // if not
      const results = await db
        .collection("movies")
        .update(
          { _id: ObjectId(req.query.movieid) },
          { $addToSet: { likers: req.query.uemail } }
        );
      res.json({
        isLikersExist: isLikersExist,
        isInLikers: isInLikers,
        state: "addingToSet",
        results,
      });
    }
  } else {
    // if no
    const results = await db
      .collection("movies")
      .updateOne(
        { _id: ObjectId(req.query.movieid) },
        { $set: { likers: [req.query.uemail] } }
      );
    res.json({
      isLikersExist: isLikersExist,
      state: "setting new array and add user",
      results,
    });
  }
};

// ----- to insert new doc in collection ----- //
// async function addDocument(doucment) {
//   const { db } = await connectToDatabase();
//   const result = await db.collection("movies").insertOne(document);
//   return result;
// }

// ----- to delete one doc in collection ----- //
// async function deleteDoc(doc_id) {
//   const { db } = await connectToDatabase();
//   const result = await db.collection("movies").deleteOne({_id: doc_id});
//   return result;
// }

// ----- to delete many docs in collection ----- //
// async function deleteDocs(nbr_views) {
//   const { db } = await connectToDatabase();
//   const result = await db.collection("movies").deleteMany({nbrViews : { $lt: nbr_views }});
//   return result;
// }

// ----- to insert MANY new doc in collection ----- //
// async function addDocument(doucmentArray) {
//   const { db } = await connectToDatabase();
//   const result = await db.collection("movies").insertMany(documentArray);
//   return result;
// }

// ----- to get One doc in collection ----- //
// async function getOneDocumentByID(doc_id) {
//   const { db } = await connectToDatabase();
//   const result = await db.collection("movies").findOne({ _id: doc_id });
//   if (result) {
//     return result;
//   } else {
//     return "Not found";
//   }
// }

// ----- to get MANY docs in collection ----- //
// async function getManyDocumentsByMinNbrRooms(min_rooms) {
//   const { db } = await connectToDatabase();
//   const cursor = await db.collection("movies").find({
//    rooms: {$gte: min_rooms}
//    }).sort({reviews: -1}).limit(10);
//   const result = await cursor.toArray();
//   if (result) {
//     return result;
//   } else {
//     return "Not found";
//   }
// }

// ----- to update One doc in collection ----- //
// async function updateOneDoc(doc_id,updatedDoc) {
//   const { db } = await connectToDatabase();
//   // only update the fields that are passed in the updatedDoc will be updated
//   const results = await db.collection("movies").updateOne({ _id: doc_id }, { $set: updatedDoc });
//   return result;
// }

// ----- to update if exists, insert if not, One doc in collection ----- //
// async function upSertDoc(doc_id,updatedDoc) {
//   const { db } = await connectToDatabase();
//   // only update the fields that are passed in the updatedDoc will be updated
//   const results = await db.collection("movies").updateOne({ _id: doc_id }, { $set: updatedDoc }, { upsert: true});
//   return result;
// }

// ----- to update Many docs in collection ----- //
// async function updateManyDocs(updatedDoc) {
//   const { db } = await connectToDatabase();
//   // only update the fields that are passed in the updatedDoc will be updated
//   const results = await db.collection("movies").updateMany({ likers: {$exists: false} }, { $set: {likers: []}});
//   return result;
// }
