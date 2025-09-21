import { model, Schema } from "mongoose";

// Create a Schema for Movie
const movieSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  clues: {
    type: [String],
    required: true
  },
  hint: {
    type: String,
    required: true
  },
  final_answer: {
    type: String,
    required: true
  },
});

// Create a Model for Movie
const Movie = model("Movie", movieSchema);

export default Movie;
