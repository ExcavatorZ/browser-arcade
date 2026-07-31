import { Component, inject } from "@angular/core";
import { AuthService } from "../../shared/auth-service";

@Component({
  selector: "app-profile-overview",
  imports: [],
  templateUrl: "./profile-overview.html",
})
export class ProfileOverview {
  authService = inject(AuthService);
}
