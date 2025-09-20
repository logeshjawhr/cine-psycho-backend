import express from "express";
import {
  addNewMovie,
  deleteMoviesById,
  getAllMovies,
  updateMovieById,
} from "../controllers/movieController.js";

const router = express.Router();

router.get("/movies", getAllMovies);
router.post("/movies", addNewMovie);
router.put("/movies/:id", updateMovieById);
router.delete("/movies/:id", deleteMoviesById);

export default router;
