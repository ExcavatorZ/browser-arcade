import { Component, inject, output } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../shared/auth-service";

@Component({
  selector: "app-logout-modal",
  imports: [ReactiveFormsModule],
  templateUrl: "./logout-modal.html",
})
export class LogoutModal {
  exit = output<boolean>();
  service = inject(AuthService);

  closeModal = () => {
    this.exit.emit(false);
  };

  logout = () => {
    this.service.deleteToken();
    this.closeModal();
    location.reload();
  };
}
