import { Component, inject, OnInit, signal } from "@angular/core";
import { ProfileService, ProfileDetailInfo } from "../profile.service";
import { AuthService } from "../../shared/auth-service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-profile-details",
  imports: [],
  templateUrl: "./profile-details.html",
})
export class ProfileDetails implements OnInit {
  service = inject(ProfileService);
  authService = inject(AuthService);
  route = inject(ActivatedRoute);

  details = signal<ProfileDetailInfo | null>(null);
  userName = signal("");

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userName = params.get("userName");

      if (!userName) {
        return;
      }

      this.userName.set(userName);

      this.service.getProfileDetails(userName).subscribe({
        next: (res) => {
          this.details.set(res);
        },
        error: (err) => {
          console.error(err);
        },
      });
    });
  }
}
