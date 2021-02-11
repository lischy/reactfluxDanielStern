import { defaultState } from "./defaultState";
import { connectDB } from "./connect-db";
import { Collection } from "mongodb";

async function initializeDB() {
  //get database connection by awaiting the connectDB.

  let db = await connectDB();
  let user = await db.collection("users").findOne({ id: "U1" });
  if (!user) {
    //if no user
    //get the collection names from the default satate eg: Groups, tasks
    for (let collectionName in defaultState) {
      //define a collection.
      let collection = db.collection(collectionName);
      await collection.insertMany(defaultState[collectionName]);
    }
  }
  // } catch (exception) {
  //   console.log(exception.stack);
  // }
}

initializeDB();
