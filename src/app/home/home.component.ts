import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isOverAge = false;
  selectedFile: File | null = null;
  private url = "http://localhost:8080/upload"
  private username = localStorage.getItem("User");
  private headers = new HttpHeaders({'username': this.username!});

  constructor(private http: HttpClient, private router: Router, private userService: UserService, private snackBar: MatSnackBar) {
    this.checkIsOverAge();
  }

  private checkIsOverAge() {
    this.userService.getUserAge().subscribe(response => {
      // @ts-ignore
      this.isOverAge = response > 15;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  uploadFile() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.http.post(this.url, formData, { headers: this.headers }).subscribe(
          response => {
            // Show a success message
            this.showSnackBar('File upload successful', 'success');
            console.log('File upload success:', response);
          }
      );
    }
  }


  showSnackBar(message: string, panelClass: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = [panelClass];
    config.duration = 3000; // Duration in milliseconds (adjust as needed)

    this.snackBar.open(message, 'Close', config);
  }
}
