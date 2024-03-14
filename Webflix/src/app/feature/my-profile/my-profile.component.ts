import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from 'src/app/Types/User';
import { Movie } from 'src/app/Types/Movie';


@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit{

  user: User | undefined;
  movies: Movie[] | undefined
  isLoading: boolean = true;
  hasMovies: boolean = false;

  constructor(private userService: UserService){}

  ngOnInit(): void {
    this.userService.getProfile().subscribe((user)=>{
      this.user = user;
      this.movies = user.movies;
      
      if(this.movies.length !== 0){
        this.hasMovies = true;
      }

      this.isLoading = false
    })
  }

  submitHandler(form: NgForm){
    if (form.invalid) {
      return;
    }
    const { imageUrl } = form.value;
    this.userService.updateProfile(imageUrl).subscribe((user)=>{
      this.user = user;
      form.resetForm();
    })
  }
}
