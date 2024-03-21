import { Component, OnInit } from "@angular/core";
import { UserService } from "../app/feature/services/user.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  title = "Webflix";

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    const user = JSON.parse(sessionStorage.getItem("user") ?? "{}");
    if (Object.keys(user).length > 0) {
      console.log("User in session storage");
      this.userService.user$$.next(user);
    } else {
      console.log("No user in session storage");

      ;
    }
  }
}
