import { Component, inject, OnInit, signal } from "@angular/core";
import { SnakeLeaderboardItem, SnakeService } from "../snake.service";

@Component({
  selector: "app-snake-leaderboard",
  imports: [],
  templateUrl: "./snake-leaderboard.html",
})
export class SnakeLeaderboard implements OnInit {
  service = inject(SnakeService);

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
