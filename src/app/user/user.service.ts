import { Injectable } from '@angular/core';
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8080";
  private email = localStorage.getItem("email");
  constructor(private http:HttpClient, private router: Router) { }

    loginUser(credentials: any) {
        const url = this.apiUrl + "/login";

        this.http.post<any>(url, credentials).subscribe(response => {
            console.log(response);

            if (response && response.email && response.role) {  // Assuming 'email' is the property returned in the response.
                // Save email to local storage
                localStorage.setItem("email", response.email);
                localStorage.setItem("role", response.role);
                this.email = response.email;
                this.router.navigate(['/home']);
            }
        }, error => {
            console.error('Login failed:', error);
        });
    }

    registerUser(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>) {
      const url = this.apiUrl + "/register";
      return this.http.post<any>(url, value).subscribe(
          response => {
              console.log(response);

              if (response && response.email && response.role) {  // Assuming 'email' is the property returned in the response.
                  // Save email to local storage
                  localStorage.setItem("email", response.email);
                  localStorage.setItem("role", response.role);
                  this.email = response.email;
                  this.router.navigate(['/home']);
              }
          }, error => {
              console.error('Register failed:', error);
          });
    }

    loggout(){
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      this.router.navigate(['/login']);
    }

    getUserAge() {
        const url = `${this.apiUrl}/age?email=${this.email}`;
        return this.http.get(url);
    }

    isLoggenIn() {
        return this.email != null;
    }

    getDocuments() {
        const url = this.apiUrl + "/pending";
        return this.http.get<any>(url);
    }

    downloadDocument(docId: number) {
        const url = `${this.apiUrl}/download?requestId=${docId}`;
        return this.http.get(url, { responseType: 'blob' });
    }

    acceptDocument(requestId: string) {
        const url = this.apiUrl + "/accept";
        return this.http.post(url, requestId);
    }

    rejectDocument(requestId: string) {
        const url = this.apiUrl + "/deny";
        return this.http.post(url, requestId);
    }

    getRequest() {
        // backlog
    }
}
