import { Component, inject, OnInit, output, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../shared/auth-service";

@Component({
  selector: "app-header",
  imports: [RouterLink],
  templateUrl: "./header.html",
})
export class Header implements OnInit {
  service = inject(AuthService);
  loggedIn = signal(false);
  modalOpened = output<boolean>();

  ngOnInit(): void {
    this.loggedIn.set(this.service.isLoggedIn());
  }

  openModal = () => {
    this.modalOpened.emit(false);
  };
}
