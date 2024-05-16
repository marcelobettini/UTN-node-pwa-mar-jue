import { db } from "../dbConnection.js";
export class MovieModel {
  static async getAll() {
    const [movies, _info] = await db.query(
      `select title, g.name as genre, year, director, poster, BIN_TO_UUID(m.id) AS id
from movies m
join movie_genres mg on mg.movie_id = m.id
join genres g on mg.genre_id = g.id `
    );
    console.log(movies);
    return movies.length ? movies : null;
  }
}
