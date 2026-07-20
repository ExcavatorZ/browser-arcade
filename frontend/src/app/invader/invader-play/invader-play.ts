import { Component, signal, HostListener } from "@angular/core";

interface enemy {
  x: number;
  y: number;
  bg: string;
}

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
  enemyCounter = 8;
  enemyDirection = 8;
  maxColumns = 10;
  gameInterval: null | number = null;
  gameSpeedDelay = signal(190);
  enemies = signal<enemy[]>([]);
  finished = signal(false);

  enemyImages = [
    "assets/invader/virus_green.png",
    "assets/invader/virus_purple.png",
    "assets/invader/ransomware.png",
    "assets/invader/trojan.png",
  ];

  // Game logic

  generateEnemies = () => {
    const generated: enemy[] = [];

    for (let i = 0; i < this.enemyCounter; i++) {
      const randomImage = this.enemyImages[Math.floor(Math.random() * this.enemyImages.length)];
      const row = Math.floor(i / this.maxColumns);
      const column = i % this.maxColumns;
      generated.push({
        x: 50 + column * 50,
        y: 50 + row * 50,
        bg: `url(${randomImage})`,
      });
    }
    this.enemies.set(generated);

    this.gameInterval = setInterval(() => {
      this.moveEnemies();
    }, this.gameSpeedDelay());
  };

  moveEnemies = () => {
    const leftEnemy = Math.min(...this.enemies().map((enemy) => enemy.x));
    const rightEnemy = Math.max(...this.enemies().map((enemy) => enemy.x));
    const lowestEnemy = Math.max(...this.enemies().map((enemy) => enemy.y));
    if (leftEnemy <= 7 || rightEnemy >= 563) {
      this.enemyDirection *= -1;
      this.enemies.update((enemies) =>
        enemies.map((enemy) => ({
          ...enemy,
          y: enemy.y + 20,
        })),
      );
    }
    if (lowestEnemy >= this.playerPositionY) {
      this.endGame();
    }
    this.enemies.update((enemies) =>
      enemies.map((enemy) => ({
        ...enemy,
        x: enemy.x + this.enemyDirection,
      })),
    );
  };

  @HostListener("window:keydown", ["$event"])
  handleKeyPress = (event: KeyboardEvent) => {
    if (event.key != "ArrowLeft" && event.key != "ArrowRight" && event.key != " ") {
      return;
    }

    event.preventDefault();

    if (!this.running()) {
      this.running.set(true);
      this.generateEnemies();
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

  endGame = () => {
    clearInterval(this.gameInterval!);
    this.finished.set(true);
    this.running.set(false);
    this.saveGame();
  };

  saveGame = () => {
    console.log("Game ended.");
  };

  restart = () => {
    location.reload();
  };
}
