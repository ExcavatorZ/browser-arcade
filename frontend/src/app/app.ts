import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Homepage } from "./homepage/homepage";
import { Header } from "./header/header";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Homepage, Header],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("browser-arcade");
}
