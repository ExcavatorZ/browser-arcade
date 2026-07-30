import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

export interface InvaderLeaderboardItem {
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
export class InvaderService {
  private http = inject(HttpClient);
  url = environment.apiBaseUrl + "/Invader";

  saveResult = (score: number) => {
    this.http.post(`${this.url}/save`, score).subscribe({
      next: () => {},
      error: (err) => console.error(err),
    });
  };

  getLeaderboard = () => {
    return this.http.get<InvaderLeaderboardItem[]>(`${this.url}/leaderboard`);
  };
}
