import {
  validateMovie,
  validatePartialMovie,
} from "../validators/movieSchema.js";
import { MovieModel } from "../model/movie.js";

export class MovieController {
  static async getAllMovies(req, res) {
    const movies = await MovieModel.getAll();
    movies
      ? res
          .status(200)
          .json({ info: { status: 200, message: "Ok" }, data: movies })
      : res
          .status(404)
          .json({ info: { status: 404, message: "No movies in database" } });
  }

  static createMovie(req, res) {
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
  }

  static updateById(req, res) {
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
  }
  static searchByGenre(req, res) {
    const { genre } = req.query;
    const filteredByGenre = movies.filter((m) =>
      m.genre.some((g) => g.toLocaleLowerCase() === genre.toLocaleLowerCase())
    );
    if (filteredByGenre.length === 0) {
      res.json({ info: { status: 404, message: "No movies in that genre" } });
    } else {
      res.json({ info: { status: 200, message: "Ok" }, data: filteredByGenre });
    }
  }
  static getById(req, res) {
    const movie = movies.find((m) => m.id === req.params.movieId);
    res.status(200).json({ info: { status: 200, message: "Ok" }, data: movie });
  }
  static deleteById(req, res) {
    // res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    /*si solo agregamos el header "Access-Control-Allow-Origin" seguirá fallando. Notemos que debajo de la petición, en la pestaña de red, nos aparece otra. El tipo será OPTIONS o Preflight. Por qué? Porque CORS diferencia dos tipos de métodos:
  1- GET, HEAD y POST *con estos estamos bien con lo que ya sabemos
  2- PUT, PATCH Y DELETE **en estos casos se origina un CORS-Pre-Flight -> se dispara una petición previa de tipo OPTIONS que le pregunta a la API si autorizaría una petición PUT, PATCH o DELETE. Agregaremos una nueva configuración a app: 
  app.options("/movies/:id", (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.end();
  });*/
    const { movieId } = req.params;
    const movieIndex = movies.findIndex((m) => m.id === movieId);
    if (movieIndex === -1) {
      return res.status(404);
    }
    movies.splice(movieIndex, 1);
    return res.status(204).json({ status: 204, message: "Movie deteled." });
  }
}
