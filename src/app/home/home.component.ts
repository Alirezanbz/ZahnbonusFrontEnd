import { Component } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isOverAge = false;
  selectedFile: File | null = null;
  listOfDocuments: any;
  isUser: boolean;
  isAdmin: boolean;
  private url = "http://localhost:8080/upload"
  private email = localStorage.getItem("email");

  constructor(private http: HttpClient, private router: Router, private userService: UserService) {
    if (!userService.isLoggenIn()){
      router.navigate(['/login']);
    }
    this.checkIsOverAge();
    this.isUser = this.getRoll() === "kunde";
    this.isAdmin = this.getRoll() === "mitarbeiter";
    if (this.isAdmin){
      this.getDocuments();
    }
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
      formData.append('email', this.email!)

      this.http.post(this.url, formData).subscribe(
          response => {
            console.log('File upload success:', response);
          }
      );
    }
  }

  private getRoll() {
    return localStorage.getItem("role")
  }

  public openDocument(docId: number){
    this.userService.downloadDocument(docId).subscribe(response => {
      const blob = new Blob([response], { type: 'application/pdf' }); // Adjust the 'type' as needed

      const objectURL = URL.createObjectURL(blob);
      window.open(objectURL, '_blank');
    });
  }

  private getDocuments() {
    this.userService.getDocuments().subscribe(
        response => {
          this.listOfDocuments = response;
        }
    )
  }
}
