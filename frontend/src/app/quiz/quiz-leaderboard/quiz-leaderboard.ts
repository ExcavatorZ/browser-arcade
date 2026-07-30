import { Component, inject, OnInit, signal } from "@angular/core";
import { QuizLeaderboardItem, QuizService } from "../quiz.service";

@Component({
  selector: "app-quiz-leaderboard",
  imports: [],
  templateUrl: "./quiz-leaderboard.html",
})
export class QuizLeaderboard implements OnInit {
  service = inject(QuizService);
  selectedDifficulty = signal(2);
  selectedAmount = signal(10);

  leaderboard = signal<QuizLeaderboardItem[]>([]);

  ngOnInit(): void {
    this.service.getLeaderboard(this.selectedAmount(), this.selectedDifficulty()).subscribe({
      next: (res: any) => {
        this.leaderboard.set(res);
      },
      error: (err) => console.error(err),
    });
  }

  applyDifficulty = (filter: number) => {
    if (filter == this.selectedDifficulty()) {
      return;
    }
    this.selectedDifficulty.set(filter);
  };

  applyAmount = (filter: string) => {
    if (Number(filter) == this.selectedAmount()) {
      return;
    }
    this.selectedAmount.set(Number(filter));
  };

  setLeaderboard = () => {
    this.service.getLeaderboard(this.selectedAmount(), this.selectedDifficulty()).subscribe({
      next: (res: any) => {
        this.leaderboard.set(res);
      },
      error: (err) => console.error(err),
    });
  };
}
