import { Component, inject, signal } from "@angular/core";
import { InvaderService } from "../invader.service";
import { SnakeLeaderboardItem } from "../../snake/snake.service";

@Component({
  selector: "app-invader-leaderboard",
  imports: [],
  templateUrl: "./invader-leaderboard.html",
})
export class InvaderLeaderboard {
  service = inject(InvaderService);

  leaderboard = signal<SnakeLeaderboardItem[]>([]);

  ngOnInit(): void {
    this.service.getLeaderboard().subscribe({
      next: (res: any) => {
        this.leaderboard.set(res);
      },
      error: (err) => console.error(err),
    });
  }
}
