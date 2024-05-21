import { db } from "../dbConnection.js";
export class MovieModel {
  //get all movies in database
  static async getAll() {
    const [movies, _info] = await db.query(
      `select 
      m.title, 
      group_concat(g.name separator ', ') genre,
      m.year, 
      m.director, 
      m.poster, 
      BIN_TO_UUID(m.id) AS id
      from movies m
      join movie_genres mg on mg.movie_id = m.id
      join genres g on mg.genre_id = g.id
      
      group by m.id`
    );
    return movies.length ? movies : null;
  }

  //get all  movies of a particular genre
  static async searchByGenre(genre) {
    const [movies, _info] = await db.query(
      `select 
      m.title, 
      group_concat(g.name separator ', ') genre,
      m.year, 
      m.director, 
      m.poster, 
      BIN_TO_UUID(m.id) AS id
      from movies m
      join movie_genres mg on mg.movie_id = m.id
      join genres g on mg.genre_id = g.id
      where g.name = ?
      group by m.id`,
      [genre]
    );
    return movies.length ? movies : null;
  }
  //get a  movie by its id
  static async searchById(id) {
    const movies = [];
    return movies.length ? movie : null;
  }
}
