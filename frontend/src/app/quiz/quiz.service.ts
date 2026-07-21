import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment.development";

@Injectable({
  providedIn: "root",
})
export class QuizService {
  private http = inject(HttpClient);
  url = environment.apiBaseUrl + "/Quiz";

  getQuestions = (amount: number, difficulty: number) => {
    return this.http.get(`${this.url}?amount=${amount}&difficulty=${difficulty}`);
  };
}
