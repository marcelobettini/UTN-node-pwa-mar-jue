const express = require("express");
const app = express();
const PORT = 3000;
app.listen(PORT, (err) => {
  console.log(err ? err : `Server running on http://localhost:${PORT}`);
});
const movies = require("./model/data.json");
//TODO: Serve static file at root

//healthcheck to easily check if our server is up and running
app.get("/health", (req, res) => {
  res.json({ info: { status: "ok", message: "Running" } });
});

app.get("/movies", (req, res) => {
  res.status(200).json({ info: { status: 200, message: "ok" }, data: movies });
});
app.get("/movies/:movieId", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.movieId);
  res.status(200).json({ info: { status: 200, message: "ok" }, data: movie });
});
