import {
  validateMovie,
  validatePartialMovie,
} from "../validators/movieSchema.js";
import { isValidUUID } from "../utils/isValidUUID.js";
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

  //List all movies according to the genre query param
  static async searchByGenre(req, res) {
    const { genre } = req.query;
    const filteredByGenre = await MovieModel.searchByGenre(genre);
    if (!filteredByGenre) {
      res.json({ info: { status: 404, message: "No movies in that genre" } });
    } else {
      res.json({ info: { status: 200, message: "Ok" }, data: filteredByGenre });
    }
  }
  //List a movie by its id
  static async getById(req, res) {
    const { movieId } = req.params;
    if (!isValidUUID(movieId)) {
      return res
        .status(400)
        .json({ status: 400, message: "UUID Invalid format" });
    }
    const movie = await MovieModel.searchById(movieId);
    movie
      ? res
          .status(200)
          .json({ info: { status: 200, message: "Ok" }, data: movie })
      : res
          .status(404)
          .json({ info: { status: 404, message: "Movie not found" } });
  }
  // Delete a movie by its id
  static async deleteById(req, res) {
    const { movieId } = req.params;
    if (!isValidUUID(movieId)) {
      return res
        .status(400)
        .json({ status: 400, message: "UUID Invalid format" });
    }
    const info = await MovieModel.deleteById(movieId);
    if (info > 0) {
      res.status(200).json({ status: 200, message: "Movie deleted" });
    } else {
      res.status(404).json({ status: 404, message: "Movie Not Found" });
    }
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
}
