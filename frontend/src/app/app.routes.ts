import { Routes } from "@angular/router";
import { Homepage } from "./homepage/homepage";
import { Games } from "./games/games";

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
];
