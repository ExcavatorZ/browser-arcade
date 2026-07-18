import { Routes } from "@angular/router";
import { Homepage } from "./homepage/homepage";
import { Games } from "./games/games";
import { MemoInstruction } from "./memo/memo-instruction/memo-instruction";

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
    component: MemoInstruction,
    title: "Memory Game | Browser Arcade",
  },
];
