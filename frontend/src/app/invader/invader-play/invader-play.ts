import { Component, signal, HostListener } from "@angular/core";

@Component({
  selector: "app-invader-play",
  imports: [],
  templateUrl: "./invader-play.html",
  styleUrl: "./invader-play.css",
})
export class InvaderPlay {
  serverAmount = signal([120, 240, 360, 480]);
  running = signal(false);
  playerPositionY = 510;
  playerPositionX = signal(290);

  // Game logic

  @HostListener("window:keydown", ["$event"])
  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key != "ArrowLeft" && event.key != "ArrowRight" && event.key != " ") {
      return;
    }

    event.preventDefault();

    if (!this.running()) {
      this.running.set(true);
    } else if (event.key != " ") {
      this.movePlayer(event.key);
    }
  };

  movePlayer = (key: string) => {
    if (key == "ArrowLeft") {
      if (this.playerPositionX() <= 10) {
        this.playerPositionX.set(0);
      } else {
        this.playerPositionX.set(this.playerPositionX() - 10);
      }
    } else if (key == "ArrowRight") {
      if (this.playerPositionX() >= 560) {
        this.playerPositionX.set(560);
      } else {
        this.playerPositionX.set(this.playerPositionX() + 10);
      }
    }
  };
}
