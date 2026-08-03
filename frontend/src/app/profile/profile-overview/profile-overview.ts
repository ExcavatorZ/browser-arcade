import { Component, inject, OnInit, signal } from "@angular/core";
import { AuthService } from "../../shared/auth-service";
import { ProfileInfo, ProfileService } from "../profile.service";
import { ActivatedRoute, RouterLink } from "@angular/router";

@Component({
  selector: "app-profile-overview",
  imports: [RouterLink],
  templateUrl: "./profile-overview.html",
})
export class ProfileOverview implements OnInit {
  service = inject(ProfileService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  overview = signal<ProfileInfo | null>(null);
  userName = signal("");

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userName = params.get("userName");

      if (!userName) {
        return;
      }

      this.userName.set(userName);

      this.service.getProfileOverview(userName).subscribe({
        next: (res) => {
          this.overview.set(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }
}
