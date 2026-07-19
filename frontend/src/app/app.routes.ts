import { Routes } from "@angular/router";
import { Homepage } from "./homepage/homepage";
import { Games } from "./games/games";
import { MemoInstruction } from "./memo/memo-instruction/memo-instruction";
import { MemoPlay } from "./memo/memo-play/memo-play";
import { SnakeInstruction } from "./snake/snake-instruction/snake-instruction";

export const routes: Routes = [
  {
    path: "",
    component: Homepage,
    title: "Home | Browser Arcade",
  },
  {
    path: "games",
    component: Games,
    title: "Game List | Browser Arcade",
  },
  {
    path: "memo",
    children: [
      {
        path: "",
        component: MemoInstruction,
        title: "Memory Game | Browser Arcade",
      },
      {
        path: "play",
        component: MemoPlay,
        title: "Memory Game | Browser Arcade",
      },
    ],
  },
  {
    path: "snake",
    children: [
      {
        path: "",
        component: SnakeInstruction,
        title: "Memory Game | Browser Arcade",
      },
    ],
  },
];
