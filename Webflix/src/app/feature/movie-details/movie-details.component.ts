import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { Movie } from 'src/app/Types/Movie';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from '../services/modal.service';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  comments: any;
  movie: Movie | undefined;
  movieId = this.route.snapshot.params["id"];
  isLoggedIn: boolean = false;
  isOwner: boolean = false;

  constructor(
    private movieService: MovieService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.movieService.getMovie(this.movieId).subscribe(movie => {
      this.movie = movie;
      this.comments = movie.comments;
      this.userService.user$.subscribe((user)=>{
        if(user){
          this.isLoggedIn = true;
          if(this.movie?.ownerId === user?._id){
            this.isOwner = true;
          }
        }
      })
    })

  }

  getNewComment(comments: any){
      this.comments = comments;
  }

  deleteHandler(): void {
    this.modalService.open();
  }

  editHandler():void {
    this.router.navigate([`/movie-edit/${this.movieId}`], { state: { isOwner: this.isOwner } });
  }
}
