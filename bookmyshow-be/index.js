import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import { moviesRouter } from "./routes/movies.js";
import { userRouter } from "./routes/users.js";

dotenv.config();
const app = express();
app.use(cors());
 const PORT= 5500;

app.use(express.json());
app.use("/movies", moviesRouter);
app.use("/users", userRouter);

const MONGO_URL =  'mongodb+srv://Selva:f0SkenXygfZGogWW@cluster0.zphx6l8.mongodb.net/BookMyShow-be'

const createConnection = async () => {
  const client = new MongoClient(MONGO_URL);
  await client.connect();
  console.log("MongoDB connected");
  return client;
};

export const client = await createConnection();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
