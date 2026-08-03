import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

export interface ProfileInfo {
  quizGames: number;
  memoryGames: number;
  snakeGames: number;
  invaderGames: number;
}

export interface ProfileDetailInfo {
  quizGames: number;
  memoryGames: number;
  snakeGames: number;
  invaderGames: number;
  commonMemoSize: string;
  commonQuizLength: number;
  commonQuizDifficulty: number;
  commonSnakeScore: number;
  snakeHighScore: number;
  commonInvaderScore: number;
  invaderHighScore: number;
}

@Injectable({
  providedIn: "root",
})
export class ProfileService {
  private http = inject(HttpClient);
  url = environment.apiBaseUrl + "/profile";

  getProfileOverview = (userName: string) => {
    return this.http.get<ProfileInfo>(`${this.url}/overview/${userName}`);
  };

  getProfileDetails = (userName: string) => {
    return this.http.get<ProfileDetailInfo>(`${this.url}/details/${userName}`);
  };
}
