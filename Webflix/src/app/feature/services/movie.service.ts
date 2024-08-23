import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment.prod";
import { Observable } from "rxjs";
import { Movie } from "../../Types/Movie";

@Injectable({
  providedIn: "root",
})
export class MovieService {
  constructor(private http: HttpClient) {}

  getMovie(id: string) {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`);
  }

  getMovies() {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
  }

  createMovie(
    title: string,
    director: string,
    year: number,
    genre: string,
    imageUrl: string,
    plot: string
  ) {
    return this.http.post<Movie>(`${environment.apiUrl}/movies`, {
      title,
      director,
      year,
      genre,
      imageUrl,
      plot,
    });
  }

  editMovie(
    title: string,
    director: string,
    year: number,
    genre: string,
    imageUrl: string,
    plot: string,
    movieId: string
  ) {
    return this.http.post<Movie>(
      `${environment.apiUrl}/movies/${movieId}/edit`,
      { title, director, year, genre, imageUrl, plot }
    );
  }

  deleteMovie(movieId: string) {
    return this.http.post<Movie>(
      `${environment.apiUrl}/movies/${movieId}/delete`,
      {}
    );
  }

  deleteComment(commentId: any) {
    const token = "YOUR_TOKEN_VALUE"; // Replace "YOUR_TOKEN_VALUE" with the actual token value
    const headers = new HttpHeaders({
      Authorization: "Bearer " + token,
    });
    return this.http.post<Movie>(
      `${environment.apiUrl}/movies/${commentId._id}/delete`,
      {},
      { headers: headers }
    );
  }

  getMovieWithLimit(limit?: number) {
    const limitFilter = limit ? `?limit=${limit}` : "";

    return this.http.get<Movie[]>(
      `${environment.apiUrl}/movies/latest${limitFilter}`
    );
  }

  searchMovies(query: string): Observable<any> {
    console.log(query);

    return this.http.get(`${environment.apiUrl}/search/${query}`);
  }
}
