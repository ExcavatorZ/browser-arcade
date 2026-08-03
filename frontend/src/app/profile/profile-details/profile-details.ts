import { Component, inject, OnInit, signal } from "@angular/core";
import { ProfileService, ProfileDetailInfo } from "../profile.service";
import { AuthService } from "../../shared/auth-service";

@Component({
  selector: "app-profile-details",
  imports: [],
  templateUrl: "./profile-details.html",
})
export class ProfileDetails implements OnInit {
  service = inject(ProfileService);
  authService = inject(AuthService);

  details = signal<ProfileDetailInfo | null>(null);

  ngOnInit(): void {
    this.service.getProfileDetails().subscribe({
      next: (res: any) => {
        this.details.set(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
