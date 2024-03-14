import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
  @ViewChild('form') form: NgForm | undefined;

  movieId = this.activedRoute.snapshot.params["id"];

  constructor(private movieService: MovieService, private activedRoute: ActivatedRoute, private router: Router){}

  ngOnInit(): void {
    this.movieService.getMovie(this.movieId).subscribe((movie)=>{
      const {title, director, year, plot, genre, imageUrl} = movie
      this.form?.setValue({title, director, year, plot, genre, imageUrl});
    })
  }
  
  submitHandler(){
    if (this.form?.invalid) {
      return;
    }
    const {title, director, year, genre, imageUrl, plot} = this.form?.value;
    this.movieService.editMovie(title, director, year, genre, imageUrl, plot, this.movieId).subscribe(()=>{
      this.router.navigate([`/movie-details/${this.movieId}`]);
    })
  }
}
