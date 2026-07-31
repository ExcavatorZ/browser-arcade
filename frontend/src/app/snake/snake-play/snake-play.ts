import { Component, inject, signal, HostListener, OnInit } from "@angular/core";
import { SnakeService } from "../snake.service";
import { AuthService } from "../../shared/auth-service";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-snake-play",
  imports: [RouterLink],
  templateUrl: "./snake-play.html",
  styleUrl: "./snake-play.css",
})
export class SnakePlay implements OnInit {
  service = inject(SnakeService);
  authService = inject(AuthService);

  finished = signal(false);
  running = signal(false);
  bug = signal<{ x: number; y: number }>({ x: 0, y: 0 });

  // Gameplay logic

  ngOnInit(): void {
    this.bug.set(this.generateRandomPosition());
  }

  snake = signal([{ x: 10, y: 10 }]);
  direction = signal("");
  gameInterval: null | number = null;
  gameSpeedDelay = signal(200);
  score = signal(0);

  generateRandomPosition = () => {
    const x = Math.floor(Math.random() * 20) + 1;
    const y = Math.floor(Math.random() * 20) + 1;
    return { x, y };
  };

  inputRejecter = {
    ArrowUp: "ArrowDown",
    ArrowLeft: "ArrowRight",
    ArrowDown: "ArrowUp",
    ArrowRight: "ArrowLeft",
  };

  moveSnake = () => {
    const head = { ...this.snake()[0] };
    switch (this.direction()) {
      case "ArrowUp":
        head.y--;
        break;
      case "ArrowLeft":
        head.x--;
        break;
      case "ArrowDown":
        head.y++;
        break;
      case "ArrowRight":
        head.x++;
        break;
      default:
        break;
    }

    if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
      this.endGame();
      return;
    }
    for (let i = 1; i < this.snake().length; i++) {
      if (head.x == this.snake()[i].x && head.y == this.snake()[i].y) {
        this.endGame();
        return;
      }
    }

    this.snake.update((snake) => {
      const next = [...snake];
      next.unshift(head);

      if (head.x == this.bug().x && head.y == this.bug().y) {
        this.bug.set(this.generateRandomPosition());
        clearInterval(this.gameInterval!);
        this.gameSpeedDelay.update((speed) => speed - 3);
        this.gameInterval = setInterval(() => {
          this.moveSnake();
        }, this.gameSpeedDelay());

        this.score.update((score) => score + 1);
      } else {
        next.pop();
      }

      return next;
    });
  };

  @HostListener("window:keydown", ["$event"])
  handleKeyPress = (event: KeyboardEvent) => {
    if (
      event.key != "ArrowUp" &&
      event.key != "ArrowLeft" &&
      event.key != "ArrowDown" &&
      event.key != "ArrowRight"
    ) {
      return;
    } else if (this.direction() == event.key) {
      return;
    } else if (this.inputRejecter[event.key] == this.direction()) {
      return;
    } else if (this.finished()) {
      return;
    }

    event.preventDefault();

    this.direction.set(event.key);
    if (!this.running()) {
      this.startGame();
    }
  };

  startGame = () => {
    this.running.set(true);
    this.gameInterval = setInterval(() => {
      this.moveSnake();
    }, this.gameSpeedDelay());
  };

  endGame = () => {
    clearInterval(this.gameInterval!);
    this.finished.set(true);
    this.running.set(false);
    this.saveGame();
  };

  saveGame = () => {
    if (this.authService.loggedIn()) {
      this.service.saveResult(this.score());
    }
  };

  restart = () => {
    location.reload();
  };
}
