import express from "express";
import dotenv from "dotenv";

import movieRoutes from "./routes/movieRoutes.js";
import { connectDb } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || PORT;

// Home route
app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use("/", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
