import { client } from "../index.js";

export async function deleteMovieById(id) {
  return await client
    .db("bookmyshow")
    .collection("movies")
    .deleteOne({ _id: id });
}

export async function createMovies(data) {
  return await client.db("bookmyshow").collection("movies").insertOne(data);
}

export async function getMovieById(id) {
  return await client
    .db("bookmyshow")
    .collection("movies")
    .findOne({ _id: id });
}

export async function getAllMovies() {
  return await client.db("bookmyshow").collection("movies").find({}).toArray();
}

export async function updateMovieById(id, data) {
  return await client
    .db("bookmyshow")
    .collection("movies")
    .updateOne({ _id: id }, { $set: data });
}

export async function createUser(data) {
  return await client.db("bookmyshow").collection("users").insertOne(data);
}

export async function loginUser(email) {
  return await client.db("bookmyshow").collection("users").findOne({ email });
}
