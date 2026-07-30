import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

export interface SnakeLeaderboardItem {
  id: number;
  score: number;
  date: string;
  user: {
    userName: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class SnakeService {
  private http = inject(HttpClient);
  url = environment.apiBaseUrl + "/Snake";

  saveResult = (score: number) => {
    this.http.post(`${this.url}/save`, score).subscribe({
      next: () => {},
      error: (err) => console.error(err),
    });
  };

  getLeaderboard = () => {
    return this.http.get<SnakeLeaderboardItem[]>(`${this.url}/leaderboard`);
  };
}
