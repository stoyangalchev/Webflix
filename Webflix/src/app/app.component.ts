
import { Component, OnInit } from "@angular/core";
import { UserService } from "../app/feature/services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Webflix";

  constructor(private userService: UserService) {}

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem("user") ?? "{}");
    if (user) {
      this.userService.user$$.next(user);
    }

   
  }
}