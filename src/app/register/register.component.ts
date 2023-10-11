import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  constructor(private userService: UserService) {
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
