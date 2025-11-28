// /lib/dbConnect.js
import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.MongoDB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error("Please define the MONGODB_URI environment variable");
}
if (!dbName) {
  throw new Error("Please define the MONGODB_DB environment variable");
}

let cachedClient = global._mongoClient;
let cachedDb = global._mongoDb;

export default function connectToDatabase(collectionName) {
  if (!cachedClient) {
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    cachedClient = client;
    global._mongoClient = cachedClient;
  }

  if (!cachedDb) {
    cachedDb = cachedClient.db(dbName);
    global._mongoDb = cachedDb;
  }

  return cachedDb.collection(collectionName);
}

export const collectionNamesObj = {
  servicesCollection: "products",
  userCollection: "users",
};
