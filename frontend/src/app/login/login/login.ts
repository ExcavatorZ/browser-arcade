import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../shared/auth-service";

@Component({
  selector: "app-login",
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./login.html",
})
export class Login implements OnInit {
  formBuilder = inject(FormBuilder);
  service = inject(AuthService);
  router = inject(Router);

  notFoundErrorMessage = signal("");
  passwordErrorMessage = signal("");

  form = this.formBuilder.group({
    email: [""],
    password: [""],
  });

  ngOnInit(): void {
    if (this.service.loggedIn()) {
      this.router.navigateByUrl("/");
    }
  }

  onSubmit = () => {
    this.service.loginUser(this.form.value).subscribe({
      next: (res: any) => {
        this.service.saveToken(res.token);
        this.router.navigateByUrl("/");
      },
      error: (err) => {
        if (err.status == 404) {
          this.notFoundErrorMessage.set(err.error.message);
          this.passwordErrorMessage.set("");
        } else {
          this.passwordErrorMessage.set(err.error.message);
          this.notFoundErrorMessage.set("");
        }
      },
    });
  };
}
