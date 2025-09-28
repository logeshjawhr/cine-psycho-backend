import { model, Schema } from "mongoose";

// Create a Schema for Movie
const movieSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  clues: {
    type: [String],
    required: true,
    validate: [(arr) => arr.length <= 4, "{PATH} exceeds the limit of 4 clues"],
    default: [],
  },
  hint: {
    type: String,
    required: true,
  },
  final_answer: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    required: true,
  },
});

// Create a Model for Movie
const Movie = model("Movie", movieSchema);

export default Movie;
