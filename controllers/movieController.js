import Movie from "../models/Movie.js";

export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMovieById = async (req, res) => {
  const id = req.params.id;
  try {
    const movies = await Movie.findById(id);
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
    difficulty: req.body.difficulty,
  });

  try {
    const movie = await newMovie.save();
    return res.status(201).json(movie);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

export const updateMovieById = (req, res) => {
  // will implement later
  res.send("Add movies");
};

export const deleteMoviesById = (req, res) => {
  const id = req.params.id;
  try {
    Movie.findByIdAndDelete(id)
      .then((movie) => {
        if (!movie) {
          return res.status(404).json({ message: "Movie not found" });
        }
        res.json({ message: "Movie deleted successfully" });
      })
      .catch((error) => {
        res.status(500).json({ message: error.message });
      });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
