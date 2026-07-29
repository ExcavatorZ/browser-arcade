import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
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
  };
}
