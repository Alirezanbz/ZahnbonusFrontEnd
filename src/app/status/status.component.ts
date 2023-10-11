import { Component } from '@angular/core';
import {UserService} from "../user/user.service";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent {
  request: any;
  constructor(private userService: UserService) {
    this.request = userService.getRequest();
  }
}
