import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { mergeMap } from 'rxjs';


@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent{

  @Output() commentIsCreated = new EventEmitter<any>();
  
  movieId = this.route.snapshot.params["id"];


  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService
    ){}

  submitHandler(form: NgForm){
    if(form.invalid){
      return
    }

    const {comment} = form.value;


    this.commentService.createComment(comment, this.movieId).pipe(
      mergeMap(()=>{
        return this.commentService.getComments(this.movieId)
      })
    )
    .subscribe((comments)=>{
        this.commentIsCreated.emit(comments)
    });

    form.reset();
  }
}
