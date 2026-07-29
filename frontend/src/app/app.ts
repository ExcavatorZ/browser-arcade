import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Header } from "./header/header";
import { LogoutModal } from "./header/logout-modal/logout-modal";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Header, LogoutModal],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App {
  protected readonly title = signal("browser-arcade");

  modalOpened = signal(false);

  handleModal = (type: string) => {
    if (type == "open") {
      this.modalOpened.set(true);
    } else {
      this.modalOpened.set(false);
    }
  };
}
