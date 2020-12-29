import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { app } from "./app";

// TODO: Initialize a MongoDB Service Client
const mongoClient = app.getServiceClient(
  RemoteMongoClient.factory,
  "JobHub-Service"
);

// TODO: Instantiate a collection handle for todo.items
const items = mongoClient.db("test").collection("boards");
console.log("items:"+ items);

export { items };

export function watchItems() {
  const streamPromise = items.watch();
  const getStream = () => streamPromise;
  const closeStream = () => streamPromise.then(stream => stream.close);
  return [getStream, closeStream];
}
