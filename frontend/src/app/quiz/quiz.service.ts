import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

export interface QuizItem {
  id: number;
  question: string;
  answer0: string;
  answer1: string;
  answer2: string;
  answer3: string;
  correctIndex: number;
  difficulty: number;
}

export interface QuizLeaderboardItem {
  id: number;
  score: number;
  totalQuestions: number;
  difficulty: number;
  timeTaken: number;
  date: string;
  user: {
    userName: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class QuizService {
  private http = inject(HttpClient);
  url = environment.apiBaseUrl + "/Quiz";

  amount: string = "5";
  difficulty: string = "2";

  saveQuizInfo = (amountInput: string, difficultyInput: string) => {
    this.amount = amountInput;
    this.difficulty = difficultyInput;
  };

  getQuestions = (amount: string, difficulty: string) => {
    return this.http.get<QuizItem[]>(`${this.url}?amount=${amount}&difficulty=${difficulty}`);
  };

  saveResult = (gameData: any) => {
    this.http
      .post(`${this.url}/save`, {
        score: gameData.score,
        totalQuestions: gameData.totalQuestions,
        difficulty: gameData.difficulty,
        timeTaken: gameData.timeTaken,
      })
      .subscribe({
        next: () => {},
        error: (err) => console.error(err),
      });
  };

  getLeaderboard = (totalQuestions: number, difficulty: number) => {
    return this.http.get<QuizLeaderboardItem[]>(
      `${this.url}/leaderboard?totalQuestions=${totalQuestions}&difficulty=${difficulty}`,
    );
  };
}
