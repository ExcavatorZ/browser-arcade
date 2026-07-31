import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

export interface ProfileInfo {
  quizGames: number;
  memoryGames: number;
  snakeGames: number;
  invaderGames: number;
}

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private http = inject(HttpClient);
  url = environment.apiBaseUrl + "/profile";

  getProfileOverview = () => {
    return this.http.get<ProfileInfo>(`${this.url}/overview`);
  };
}
