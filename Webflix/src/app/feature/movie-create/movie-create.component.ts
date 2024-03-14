import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent {

  constructor(private movieService: MovieService, private router: Router) { }

  submitHandler(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const { title, director, year, genre, imageUrl, plot } = form.value;
    this.movieService.createMovie( title, director, year, genre, imageUrl, plot ).subscribe(()=>{
      this.router.navigate(["dashboard"]);
    })
  }
}
