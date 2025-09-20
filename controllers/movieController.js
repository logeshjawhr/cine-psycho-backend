import Movie from "../models/movieModel.js";

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const addNewMovie = async (req, res) => {
  // Validate
  const newMovie = new Movie({
    question: req.body.question,
    clues: req.body.clues,
    hint: req.body.hint,
    final_answer: req.body.final_answer,
  });

  try {
    const movie = await newMovie.save();
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateMovieById = (req, res) => {
  res.send("Add movies");
};

export const deleteMoviesById = (req, res) => {
  res.send("Delete movies");
};
