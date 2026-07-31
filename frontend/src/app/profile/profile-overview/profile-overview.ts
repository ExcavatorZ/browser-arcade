import { Component, inject, OnInit, signal } from "@angular/core";
import { AuthService } from "../../shared/auth-service";
import { ProfileInfo, ProfileService } from "../profile.service";

@Component({
  selector: "app-profile-overview",
  imports: [],
  templateUrl: "./profile-overview.html",
})
export class ProfileOverview implements OnInit {
  service = inject(ProfileService);
  authService = inject(AuthService);

  overview = signal<ProfileInfo | null>(null);

  ngOnInit(): void {
    this.service.getProfileOverview().subscribe({
      next: (res: any) => {
        this.overview.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
