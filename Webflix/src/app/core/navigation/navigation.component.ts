import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/feature/services/user.service';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {

  constructor(private userService: UserService, private router: Router){}

  get isLoggedIn(): boolean {
    return this.userService.isLoggedIn;
  }

  logoutHandler(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.router.navigate([`/login`]);
      },
      error: () => {
        this.router.navigate([`/login`]);
      },
    });
  }
}
