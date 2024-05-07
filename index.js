const express = require("express");
const crypto = require("node:crypto");

const {
  validateMovie,
  validatePartialMovie,
} = require("./validators/movieSchema");

const app = express();
app.disable("x-powered-by");
app.use(express.json()); //middleware to read json body

const movies = require("./model/data.json");
//TODO: Serve static file at root

//healthcheck to easily check if our server is up and running
app.get("/health", (req, res) => {
  res.json({ info: { status: "Ok", message: "Running" } });
});

// list all movies

app.get("/movies", (req, res) => {
  res.status(200).json({ info: { status: 200, message: "Ok" }, data: movies });
});

// Create a new resource (movie)
app.post("/movies", (req, res) => {
  //use the recently created validator

  const validationResult = validateMovie(req.body);

  if (validationResult.error) {
    res.status(422).json({
      info: { status: 422, message: "Validation errors" },
      errors: validationResult.error.issues,
    });
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...validationResult.data,
  };
  movies.push(newMovie);
  res.status(201).json({
    info: { status: 201, message: "movie created ok" },
    data: newMovie,
  });
});

// update a resource by its id
app.patch("/movies/:movieId", (req, res) => {
  const validationResult = validatePartialMovie(req.body);
  if (validationResult.error) {
    res.status(422).json({
      info: { status: 422, message: "Validation errors" },
      errors: validationResult.error.issues,
    });
  }
  const { movieId } = req.params;
  const movieIndex = movies.findIndex((m) => m.id === movieId);
  if (movieIndex === -1) {
    return res
      .status(404)
      .json({ info: { status: 404, message: "Movie not found" } });
  }
  const updatedMovie = {
    ...movies[movieIndex],
    ...validationResult.data,
  };
  movies[movieIndex] = updatedMovie;
  res.status(200).json({
    info: { status: 200, message: "Movie updated" },
    data: updatedMovie,
  });
});

//search movies by its genre
app.get("/movies/search", (req, res) => {
  const { genre } = req.query;
  const filteredByGenre = movies.filter((m) =>
    m.genre.some((g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
  );
  if (filteredByGenre.length === 0) {
    res.json({ info: { status: 404, message: "No movies in that genre" } });
  } else {
    res.json({ info: { status: 200, message: "Ok" }, data: filteredByGenre });
  }
});

//get a movie by its id
app.get("/movies/:movieId", (req, res) => {
  const movie = movies.find((m) => m.id === req.params.movieId);
  res.status(200).json({ info: { status: 200, message: "Ok" }, data: movie });
});

const PORT = 3000;
app.listen(PORT, (err) => {
  console.log(err ? err : `Server running on http://localhost:${PORT}`);
});
