const express = require("express");
const moviesRouter = require("./route/movies.js");

const app = express();
app.disable("x-powered-by");
app.use(express.json()); //middleware to read json body
/* app.options("/movies/:movieId", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
  res.header("Access-Control-Allow-Methods", "DELETE");
  res.end();
}); */
//TODO: Serve static file at root

//healthcheck to easily check if our server is up and running
app.get("/health", (req, res) => {
  res.json({ info: { status: "Ok", message: "Running" } });
});

app.use("/movies", moviesRouter);
const PORT = 3000;
app.listen(PORT, (err) => {
  console.log(err ? err : `Server running on http://localhost:${PORT}`);
});
