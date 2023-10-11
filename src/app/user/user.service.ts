import { Injectable } from '@angular/core';
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8080";
  private email: any;
  constructor(private http:HttpClient, private router: Router) { }

    loginUser(credentials: any) {
        const url = this.apiUrl + "/login";

        this.http.post<any>(url, credentials).subscribe(response => {
            console.log(response);

            if (response && response.email) {  // Assuming 'email' is the property returned in the response.
                // Save email to local storage
                localStorage.setItem("email", response.email);
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

              if (response && response.email) {  // Assuming 'email' is the property returned in the response.
                  // Save email to local storage
                  localStorage.setItem("email", response.email);
                  this.email = response.email;
                  this.router.navigate(['/home']);
              }
          }, error => {
              console.error('Register failed:', error);
          });
    }

    getUserAge() {
      const url = this.apiUrl + "/age";
      return this.http.post(url, this.email);
    }

    isLoggenIn() {
        return this.email != null;
    }
}
