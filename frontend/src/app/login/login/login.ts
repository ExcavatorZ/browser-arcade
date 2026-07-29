import { Component, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { AuthService } from "../../shared/auth-service";

@Component({
  selector: "app-login",
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: "./login.html",
})
export class Login {
  formBuilder = inject(FormBuilder);
  service = inject(AuthService);
  router = inject(Router);

  form = this.formBuilder.group({
    email: [""],
    password: [""],
  });

  onSubmit = () => {
    this.service.loginUser(this.form.value).subscribe({
      next: (res: any) => {
        this.service.saveToken(res.token);
        this.router.navigateByUrl("/");
      },
      error: (err) => {
        console.log(err);
      },
    });
  };
}
