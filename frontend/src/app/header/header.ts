import { Component, inject, output } from "@angular/core";
import { RouterLink } from "@angular/router";
import { AuthService } from "../shared/auth-service";

@Component({
  selector: "app-header",
  imports: [RouterLink],
  templateUrl: "./header.html",
})
export class Header {
  service = inject(AuthService);
  modalOpened = output<boolean>();

  openModal = () => {
    this.modalOpened.emit(false);
  };
}
