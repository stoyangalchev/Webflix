import { Component, OnInit, ViewChild } from "@angular/core";
import { MovieService } from "../services/movie.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
})
export class SearchComponent {
  @ViewChild("searchForm") searchForm: NgForm | undefined;
  movies: any;
  noMovies = true;
  isLoading = true;
  constructor(private movieService: MovieService) {}

  onSearch(form: NgForm): void {
    const { query } = form.value;
    console.log("Search query:", query);
    if (!query) {
      return;
    }
    this.movieService.searchMovies(query).subscribe(
      (movies) => {
        console.log("Search results:", movies);
        this.movies = movies;
        this.isLoading = false;
        if (this.movies.length !== 0) {
          this.noMovies = false;
        }
        form.reset();
      },
      (error) => {
        console.error("Error occurred:", error);
      }
    );
  }
}
