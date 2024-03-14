import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  emailValidatorPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
  

  constructor(private userService: UserService, private router: Router) { }

  submitHandler(form: NgForm): void {

    if (form.invalid) {
      return;
    }

    const {
      username,
      email,
      passwords,
      age,
    } = form.value;
    
    this.userService
      .register(username,
        email,
        passwords.password,
        passwords.rePassword,
        age,)
      .subscribe(() => {
        this.router.navigate(['/login']);
      });
  }

}

