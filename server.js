import express from "express";

import movieRoutes from "./routes/movieRoutes.js";

const app = express();
const PORT = 5000;

// Home route
app.get("/", (req, res) => {
  res.send("hello from server");
});

app.use("/", movieRoutes);

app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
