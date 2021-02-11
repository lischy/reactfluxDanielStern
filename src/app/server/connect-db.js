import { MongoClient } from "mongodb";
import { Children } from "react";
import { debug } from "debug";
const url = `mongodb://localhost:27017/mylib`;
const dbName = `mylib`;
let db = null;
export async function connectDB() {
  if (db) return db; //return the database if already defined
  try {
    let client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    db = client.db();
    console.log("Got the db,", db);
    return db;
  } catch (err) {
    console.log(err.stack);
  }
}
// connectDB();
