import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private http = inject(HttpClient);
  url = environment.apiBaseUrl;

  createUser = (formData: any) => {
    return this.http.post(`${this.url}/User/signup`, formData);
  };

  loginUser = (formData: any) => {
    return this.http.post(`${this.url}/User/login`, formData);
  };

  saveToken = (token: string) => {
    this.loggedIn.set(true);
    localStorage.setItem("token", token);
  };

  getToken = () => {
    return localStorage.getItem("token");
  };

  deleteToken = () => {
    this.loggedIn.set(false);
    localStorage.removeItem("token");
  };

  loggedIn = signal(this.getToken() != null);
}
