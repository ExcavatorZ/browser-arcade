import { Component, inject, OnInit, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Header } from "./header/header";
import { LogoutModal } from "./header/logout-modal/logout-modal";
import { AuthService } from "./shared/auth-service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet, Header, LogoutModal],
  templateUrl: "./app.html",
  styleUrl: "./app.css",
})
export class App implements OnInit {
  protected readonly title = signal("browser-arcade");
  service = inject(AuthService);

  modalOpened = signal(false);

  handleModal = (type: string) => {
    if (type == "open") {
      this.modalOpened.set(true);
    } else {
      this.modalOpened.set(false);
    }
  };

  ngOnInit(): void {
    if (this.service.loggedIn()) {
      this.service.loadUserName();
    }
  }
}
