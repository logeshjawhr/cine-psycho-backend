import express from "express";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("hello from server");
});

app.listen(port, () => {
  console.log(`Server running on Port ${port}`);
});
