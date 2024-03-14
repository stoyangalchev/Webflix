import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Movie } from '../../Types/Movie';



@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

 
  getMovie(id: string) {
    return this.http.get<Movie>(`${environment.apiUrl}/movies/${id}`);
  }

  getMovies() {
    return this.http.get<Movie[]>(`${environment.apiUrl}/movies`);
  }

  createMovie(title: string, director: string, year: number, genre: string, imageUrl: string, plot: string) {
    return this.http.post<Movie>(`${environment.apiUrl}/movies`, { title, director, year, genre, imageUrl, plot });
  }

  editMovie(title: string, director: string, year: number, genre: string, imageUrl: string, plot: string, movieId:string) {
    return this.http.post<Movie>(`${environment.apiUrl}/movies/${movieId}/edit`, { title, director, year, genre, imageUrl, plot });
  }

  deleteMovie(movieId:string) {
    return this.http.post<Movie>(`${environment.apiUrl}/movies/${movieId}/delete`, {});
  }


  getMovieWithLimit(limit?: number) {
    const limitFilter = limit ? `?limit=${limit}` : '';

    return this.http.get<Movie[]>(`${environment.apiUrl}/movies/latest${limitFilter}`);
  }
  
}
