import express from "express";
import { ObjectId } from "mongodb";
import {
  createMovies,
  getAllMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
} from "./DBhelper.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const movies = await getAllMovies();
  movies
    ? res.status(200).json({
      message:"Movies Fetched Successfully",
      movies
    })
    : res.status(404).send({ message: "Movies not found" });
});

router.get("/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const movie = await getMovieById(id);
  movie
    ? res.status(200).send(movie)
    : res.status(404).send({ message: "Movie not found" });
});

router.post("/", async (req, res) => {
  const data = req.body;
  await createMovies(data);
  const movies = await getAllMovies();
  res.status(201).send({
    message:"Movie created Successfully",
    movies
  });
});

router.put("/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const data = req.body;
  const movie = await updateMovieById(id, data);
  const movies = await getAllMovies();
  movie
    ? res.status(200).send({
      message:"Movie Updated Successfully",
      movies
    })
    : res.status(404).send({ message: "Movie Not Found" });
});

router.delete("/:id", async (req, res) => {
  const id = new ObjectId(req.params.id);
  const movie = await deleteMovieById(id);
  const movies = await getAllMovies();
  movie.deletedCount > 0
    ? res.status(200).send({
      message:"Movie deleted successfully",
      movies
    })
    : res.status(404).send({ message: "Movie not found" });
});

export const moviesRouter = router;
