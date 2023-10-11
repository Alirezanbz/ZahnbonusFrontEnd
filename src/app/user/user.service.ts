import { Injectable } from '@angular/core';
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8080/user"; //tbd
  private username = localStorage.getItem("User");
  private headers = new HttpHeaders({'username': this.username!});
  constructor(private http:HttpClient, private router: Router) { }

    loginUser(credentials: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>) {
      const url = this.apiUrl + "/login";
      return this.http.post<any>(url, credentials, {observe: 'response'}).subscribe(
        response => {
          /*const user = response.headers.get("User")
          localStorage.setItem("User", user);
          this.router.navigate(['/home']);*/
        });
    }

    registerUser(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>) {

    }

    getUserAge() {
      const url = this.apiUrl + "/age";
      return this.http.get(url,{headers: this.headers});
    }
}
