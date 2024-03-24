import { Component, Input } from "@angular/core";
import { Observable } from "rxjs";
import { ModalService } from "../services/modal.service";
import { MovieService } from "../services/movie.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-modal",
  templateUrl: "./modal.component.html",
  styleUrls: ["./modal.component.css"],
})
export class ModalComponent {
  @Input() title: string | undefined;

  display$: Observable<string> | undefined;
  movieId = this.route.snapshot.params["id"];

  constructor(
    private modalService: ModalService,
    private movieService: MovieService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    console.log(this.title);
    this.display$ = this.modalService.watch();
  }

  close() {
    this.modalService.close();
  }

  delete() {
    this.movieService.deleteMovie(this.movieId).subscribe(
      () => {
        console.log("Deleted movie");
        this.modalService.close();
        this.router.navigate(["/my-profile"]);
      },
      (error) => {
        console.error("Error deleting movie", error);
      }
    );
  }
}
