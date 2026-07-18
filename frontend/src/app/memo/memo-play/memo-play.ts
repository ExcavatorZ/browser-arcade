import { Component, inject, OnInit } from "@angular/core";
import { MemoService } from "../memo.service";

@Component({
  selector: "app-memo-play",
  imports: [],
  templateUrl: "./memo-play.html",
  styleUrl: "./memo-play.css",
})
export class MemoPlay implements OnInit {
  service = inject(MemoService);

  amount!: number;

  ngOnInit(): void {
    this.amount = this.service.getBoardSize();
  }

  pics = this.service.getPics();
}
