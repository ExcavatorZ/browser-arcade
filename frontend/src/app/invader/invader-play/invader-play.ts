import { Component, signal } from "@angular/core";

@Component({
  selector: "app-invader-play",
  imports: [],
  templateUrl: "./invader-play.html",
})
export class InvaderPlay {
  serverAmount = signal([0, 1, 2, 3]);
}
