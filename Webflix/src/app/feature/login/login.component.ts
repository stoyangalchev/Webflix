import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  submitHandler(form: NgForm): void {
    if (form.invalid) {
      return;
    }

    const { username, password } = form.value;
    

    this.userService.login(username, password).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

} 
