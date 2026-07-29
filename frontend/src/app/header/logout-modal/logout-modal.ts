import { Component, output } from "@angular/core";

@Component({
  selector: "app-logout-modal",
  imports: [],
  templateUrl: "./logout-modal.html",
})
export class LogoutModal {
  exit = output<boolean>();

  closeModal = () => {
    this.exit.emit(false);
  };
}
