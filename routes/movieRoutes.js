import express from "express";

import {
  addNewMovie,
  // deleteMoviesById,
  getAllMovies,
  // getMovieById,
  // updateMovieById,
} from "../controllers/movieController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/movies", authMiddleware, getAllMovies);
router.post("/movies", authMiddleware, addNewMovie);

// router.get("/movies/:id", authMiddleware, getMovieById);
// router.put("/movies/:id", authMiddleware, updateMovieById);
// router.delete("/movies/:id", authMiddleware, deleteMoviesById);

export default router;
