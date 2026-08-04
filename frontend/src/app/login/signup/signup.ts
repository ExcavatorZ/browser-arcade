import { Component, inject, OnInit, signal } from "@angular/core";
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AuthService } from "../../shared/auth-service";
import { Router } from "@angular/router";
import { switchMap } from "rxjs";

@Component({
  selector: "app-signup",
  imports: [ReactiveFormsModule],
  templateUrl: "./signup.html",
})
export class Signup implements OnInit {
  formBuilder = inject(FormBuilder);
  service = inject(AuthService);
  router = inject(Router);
  isSubmitted = false;

  errorResponse = signal<any>(null);

  passwordMatchValidator = (control: AbstractControl) => {
    const password = control.get("password");
    const confirm = control.get("confirm");
    if (password && confirm && password.value != confirm.value) {
      confirm!.setErrors({ passwordMismatch: true });
    } else {
      confirm!.setErrors(null);
    }
    return null;
  };

  form = this.formBuilder.group(
    {
      userName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: [
        "",
        [Validators.required, Validators.minLength(6), Validators.pattern(/(?=.*[^a-zA-Z0-9 ])/)],
      ],
      confirm: [""],
    },
    { validators: this.passwordMatchValidator },
  );

  ngOnInit(): void {
    if (this.service.loggedIn()) {
      this.router.navigateByUrl("/");
    }
  }

  onSubmit = () => {
    if (this.form.valid) {
      this.isSubmitted = true;
      this.service
        .createUser(this.form.value)
        .pipe(switchMap(() => this.service.loginUser(this.form.value)))
        .subscribe({
          next: (res: any) => {
            this.service.saveToken(res.token);
            this.form.reset();
            this.router.navigateByUrl("/");
          },
          error: (err) => {
            this.errorResponse.set(err.error);
          },
        });
    }
  };

  hasDisplayableError = (controlName: string) => {
    const control = this.form.get(controlName);
    return Boolean(control?.invalid) && (this.isSubmitted || Boolean(control?.touched));
  };
}
