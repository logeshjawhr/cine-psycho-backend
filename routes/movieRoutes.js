import express from "express";
import {
  addNewMovie,
  deleteMoviesById,
  getAllMovies,
  getMovieById,
  updateMovieById,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovieById);
router.post("/movies", addNewMovie);
router.put("/movies/:id", updateMovieById);
router.delete("/movies/:id", deleteMoviesById);

export default router;
