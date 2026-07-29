import { Component, inject, OnInit, signal } from "@angular/core";
import { MemoLeaderboardItem, MemoService } from "../memo.service";

@Component({
  selector: "app-memo-leaderboard",
  imports: [],
  templateUrl: "./memo-leaderboard.html",
})
export class MemoLeaderboard implements OnInit {
  service = inject(MemoService);
  selectedFilter = signal("4x4");

  leaderboard = signal<MemoLeaderboardItem[]>([]);

  ngOnInit(): void {
    this.service.getLeaderboard(this.selectedFilter()).subscribe({
      next: (res: any) => {
        this.leaderboard.set(res);
      },
      error: (err) => console.error(err),
    });
  }

  applyFilter = (filter: string) => {
    if (filter == this.selectedFilter()) {
      return;
    }
    this.selectedFilter.set(filter);
    this.setLeaderboard(filter);
  };

  setLeaderboard = (board: string) => {
    this.service.getLeaderboard(board).subscribe({
      next: (res: any) => {
        this.leaderboard.set(res);
      },
      error: (err) => console.error(err),
    });
  };
}
