import { Component, inject, OnInit, signal } from "@angular/core";
import { MemoService } from "../memo.service";
import { RouterLink } from "@angular/router";
import { AuthService } from "../../shared/auth-service";

interface pic {
  id?: number;
  image: string;
  flipped: boolean;
}

@Component({
  selector: "app-memo-play",
  imports: [RouterLink],
  templateUrl: "./memo-play.html",
  styleUrl: "./memo-play.css",
})
export class MemoPlay implements OnInit {
  service = inject(MemoService);
  authService = inject(AuthService);

  amount!: number;
  cards = signal<pic[]>([]);
  completed = signal(false);

  ngOnInit(): void {
    this.amount = this.service.getBoardSize();
    this.cards.set(this.service.getPics());
  }

  // Gameplay logic

  gameCounter = signal(0);
  correct = signal(0);

  choice0: pic | null = null;
  choice1: pic | null = null;

  disabled = signal(false);

  selectCard = (card: pic) => {
    if (this.disabled()) {
      return;
    }

    if (this.choice0?.id == card.id) {
      return;
    }

    if (card.flipped == true) {
      return;
    }

    if (!this.choice0) {
      this.choice0 = card;
      this.updateArray("choice0");
      return;
    }

    this.choice1 = card;
    this.choice1.flipped = true;
    this.updateArray("choice1");
    this.checkMatch();
  };

  updateArray = (updatable: string) => {
    if (updatable == "choice0") {
      this.cards.update((cards) =>
        cards.map((card) => (card.id == this.choice0!.id ? { ...card, flipped: true } : card)),
      );
    } else if (updatable == "choice1") {
      this.cards.update((cards) =>
        cards.map((card) => (card.id == this.choice1!.id ? { ...card, flipped: true } : card)),
      );
    } else if (updatable == "choices") {
      this.cards.update((cards) =>
        cards.map((card) =>
          card.id == this.choice0!.id || card.id == this.choice1!.id
            ? { ...card, flipped: false }
            : card,
        ),
      );
    }
  };

  checkMatch = () => {
    this.gameCounter.set(this.gameCounter() + 1);
    this.disabled.set(true);
    if (this.choice0?.image == this.choice1?.image) {
      this.correct.set(this.correct() + 1);
      this.reset();
    } else {
      setTimeout(() => {
        this.updateArray("choices");
        this.reset();
      }, 1000);
    }
  };

  reset = () => {
    if (this.correct() == this.cards().length / 2) {
      this.complete();
      return;
    }
    this.choice0 = null;
    this.choice1 = null;
    this.disabled.set(false);
  };

  complete = () => {
    this.completed.set(true);
    const boardSize = this.amount == 8 ? "4x4" : "6x6";
    if (this.authService.loggedIn()) {
      this.service.saveResult({ moves: this.gameCounter(), boardSize: boardSize });
    }
  };

  restart = () => {
    location.reload();
  };
}
