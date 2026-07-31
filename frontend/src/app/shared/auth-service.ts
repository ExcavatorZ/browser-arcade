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
    localStorage.setItem("token", token);
    this.loggedIn.set(true);
    this.loadUserName();
  };

  getToken = () => {
    return localStorage.getItem("token");
  };

  deleteToken = () => {
    this.loggedIn.set(false);
    localStorage.removeItem("token");
  };

  getUserName = () => {
    return this.http.get(`${this.url}/User/name`);
  };

  loadUserName = () => {
    this.getUserName().subscribe({
      next: (res: any) => {
        this.userName.set(res);
      },
      error: (err) => console.log(err),
    });
  };

  loggedIn = signal(this.getToken() != null);
  userName = signal("");
}
