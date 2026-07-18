import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class MemoService {
  private selectedBoardSize = 8;

  private pics = [
    "assets/memo/angular.png",
    "assets/memo/aspnet.jpg",
    "assets/memo/csharp.png",
    "assets/memo/django.svg",
    "assets/memo/docker.webp",
    "assets/memo/express.webp",
    "assets/memo/java.png",
    "assets/memo/javascript.webp",
    "assets/memo/kubernetes.png",
    "assets/memo/laravel.png",
    "assets/memo/mongo.png",
    "assets/memo/node.png",
    "assets/memo/php.png",
    "assets/memo/postgresql.png",
    "assets/memo/python.png",
    "assets/memo/react.png",
    "assets/memo/tailwind.png",
    "assets/memo/typescript.png",
  ];

  shuffle(array: string[]) {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const x = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[x]] = [shuffled[x], shuffled[i]];
    }
    return shuffled;
  }

  saveBoardSize(amount: number) {
    this.selectedBoardSize = amount;
  }

  getBoardSize() {
    return this.selectedBoardSize;
  }

  getPics() {
    const shuffledPics = this.shuffle(this.pics);
    let copies = shuffledPics.slice(0, this.selectedBoardSize);
    copies = copies.concat(copies);

    return this.shuffle(copies);
  }
}
