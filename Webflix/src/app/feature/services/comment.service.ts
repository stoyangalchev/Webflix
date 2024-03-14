import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment  } from '../../Types/Comment';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  getComments(movieId: string) {
    return this.http.get<Comment>(`${environment.apiUrl}/movies/${movieId}/comments`);
  }

  createComment(text: string, movieId: string) {
    return this.http.post<Comment>(`${environment.apiUrl}/movies/${movieId}/comments`, { text });
  }
}
