import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(private router: Router, private userService: UserService) {
    if (localStorage.getItem("email") != null){
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    })
  }

  onSubmit() {
    this.userService.loginUser(this.loginForm.value);
  }
}
