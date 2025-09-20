import { model, Schema } from "mongoose";

// Create a Schema for Movie
const schema = new Schema({
  question: { type: String, required: true },
  clues: { type: [String], required: true },
  hint: { type: String, required: true },
  final_answer: { type: String, required: true },
});

// Create a Model for Movie
const Movie = model("Movie", schema);

// Export the Model
export default Movie;
