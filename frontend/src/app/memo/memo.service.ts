import { inject, Injectable } from "@angular/core";
import { AuthService } from "../shared/auth-service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.development";

interface pic {
  id?: number;
  image: string;
  flipped: boolean;
}

export interface MemoLeaderboardItem {
  id: number;
  moves: number;
  boardSize: string;
  date: string;
  user: {
    userName: string;
  };
}

@Injectable({
  providedIn: "root",
})
export class MemoService {
  private selectedBoardSize = 8;
  private http = inject(HttpClient);
  url = environment.apiBaseUrl + "/Memo";
  service = inject(AuthService);

  private pics: pic[] = [
    { image: "assets/memo/angular.png", flipped: false },
    { image: "assets/memo/aspnet.jpg", flipped: false },
    { image: "assets/memo/csharp.png", flipped: false },
    { image: "assets/memo/django.svg", flipped: false },
    { image: "assets/memo/docker.webp", flipped: false },
    { image: "assets/memo/express.webp", flipped: false },
    { image: "assets/memo/java.png", flipped: false },
    { image: "assets/memo/javascript.webp", flipped: false },
    { image: "assets/memo/kubernetes.png", flipped: false },
    { image: "assets/memo/laravel.png", flipped: false },
    { image: "assets/memo/mongo.png", flipped: false },
    { image: "assets/memo/node.png", flipped: false },
    { image: "assets/memo/php.png", flipped: false },
    { image: "assets/memo/postgresql.png", flipped: false },
    { image: "assets/memo/python.png", flipped: false },
    { image: "assets/memo/react.png", flipped: false },
    { image: "assets/memo/tailwind.png", flipped: false },
    { image: "assets/memo/typescript.png", flipped: false },
  ];

  shuffle(array: pic[]) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const x = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[x]] = [shuffled[x], shuffled[i]];
    }

    return shuffled;
  }

  saveBoardSize(amount: string) {
    amount == "8" ? (this.selectedBoardSize = 8) : (this.selectedBoardSize = 18);
  }

  getBoardSize() {
    return this.selectedBoardSize;
  }

  getPics() {
    const shuffledPics = this.shuffle(this.pics);
    let shuffledCopies = shuffledPics.slice(0, this.selectedBoardSize);
    const cardObjects = [
      ...shuffledCopies.map((card) => ({ ...card })),
      ...shuffledCopies.map((card) => ({ ...card })),
    ];
    for (let i = 0; i < cardObjects.length; i++) {
      cardObjects[i].id = i;
    }

    return this.shuffle(cardObjects);
  }

  saveResult = (gameData: any) => {
    this.http
      .post(`${this.url}/save`, { moves: gameData.moves, boardSize: gameData.boardSize })
      .subscribe({
        next: () => {},
        error: (err) => console.error(err),
      });
  };

  getLeaderboard = (board: string) => {
    return this.http.get<MemoLeaderboardItem[]>(`${this.url}/leaderboard?boardSize=${board}`);
  };
}
