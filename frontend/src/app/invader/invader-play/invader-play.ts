import { Component, signal, HostListener } from "@angular/core";

interface enemy {
  x: number;
  y: number;
  bg: string;
}

interface projectile {
  x: number;
  y: number;
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
  projectiles = signal<projectile[]>([]);
  projectileSpeedDelay = 10;
  projectileInterval: null | number = null;
  score = signal(0);

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
      this.projectileInterval = setInterval(() => {
        this.moveProjectiles();
      }, this.projectileSpeedDelay);
    } else if (event.key != " ") {
      this.movePlayer(event.key);
    } else {
      this.fire();
    }
  };

  moveProjectiles = () => {
    this.projectiles.update((projectiles) =>
      projectiles
        .map((projectile) => ({
          ...projectile,
          y: projectile.y - 5,
        }))
        .filter((projectile) => projectile.y >= 0),
    );
    this.checkProjectileCollisions();
  };

  fire = () => {
    if (this.projectiles().length >= 3) {
      return;
    }

    const generated: projectile[] = [...this.projectiles()];

    const currentProjectilePositionX = this.playerPositionX() + 15;
    const currentProjectilePositionY = this.playerPositionY;

    generated.push({ x: currentProjectilePositionX, y: currentProjectilePositionY });
    this.projectiles.set(generated);
  };

  checkProjectileCollisions = () => {
    const hitProjectiles: projectile[] = [];

    for (let i = 0; i < this.projectiles().length; i++) {
      if (this.checkCollision(this.projectiles()[i].x, this.projectiles()[i].y)) {
        hitProjectiles.push(this.projectiles()[i]);
      }
    }

    this.projectiles.update((projectiles) =>
      projectiles.filter((projectile) => !hitProjectiles.includes(projectile)),
    );
  };

  checkCollision = (projectileX: number, projectileY: number) => {
    for (let i = 0; i < this.enemies().length; i++) {
      if (
        projectileX + 30 > this.enemies()[i].x &&
        projectileX - 30 < this.enemies()[i].x &&
        projectileY + 30 > this.enemies()[i].y &&
        projectileY - 30 < this.enemies()[i].y
      ) {
        this.enemies.update((enemies) => enemies.filter((enemy) => enemy != enemies[i]));
        this.score.set(this.score() + 1);
        if (this.enemies().length == 0) {
          this.enemyCounter++;
          this.gameSpeedDelay.set(this.gameSpeedDelay() - 10);
          clearInterval(this.gameInterval!);
          this.generateEnemies();
        }
        return true;
      }
    }
    return false;
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
