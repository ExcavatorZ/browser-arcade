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
}
