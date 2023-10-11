import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../user/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(private router: Router, private userService: UserService) {
    if (localStorage.getItem("email") != null){
      router.navigate(['/home']);
    }
  }

  ngOnInit() {
    this.registerForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null),
      iban: new FormControl(null),
      dob: new FormControl(null)
    })
  }

  onSubmit() {
    this.userService.registerUser(this.registerForm.value);
  }
}
