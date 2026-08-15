// AI tests.

import { ComponentFixture, TestBed } from "@angular/core/testing";

import { Signup } from "./signup";
import { AuthService } from "../../shared/auth-service";
import { of } from "rxjs";
import { Router } from "@angular/router";

const authService = {
  loggedIn: vi.fn(() => false),
  createUser: vi.fn(() => of({})),
  loginUser: vi.fn(() => of({ token: "test-token" })),
  saveToken: vi.fn(),
};

const router = {
  navigateByUrl: vi.fn(),
};

describe("Signup", () => {
  let component: Signup;
  let fixture: ComponentFixture<Signup>;

  beforeEach(async () => {
    vi.clearAllMocks();
    await TestBed.configureTestingModule({
      imports: [Signup],
      providers: [
        {
          provide: AuthService,
          useValue: authService,
        },
        {
          provide: Router,
          useValue: router,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Signup);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should require a username", () => {
    const control = component.form.get("userName");

    control?.setValue("");

    expect(control?.valid).toBe(false);
  });

  it("should require a valid email", () => {
    const control = component.form.get("email");

    control?.setValue("not-an-email");

    expect(control?.valid).toBe(false);
  });

  it("should require matching passwords", () => {
    component.form.get("password")?.setValue("password123!");
    component.form.get("confirm")?.setValue("different123!");

    expect(component.form.get("confirm")?.valid).toBe(false);
  });

  it("should accept matching passwords", () => {
    component.form.get("password")?.setValue("password123!");
    component.form.get("confirm")?.setValue("password123!");

    expect(component.form.get("confirm")?.valid).toBe(true);
  });

  it("should not show a user error before submission", () => {
    expect(component.hasUserError("userName")).toBe(false);
  });

  it("should show a user error after submission", () => {
    component.isSubmitted = true;

    expect(component.hasUserError("userName")).toBe(true);
  });

  it("should detect a duplicate error", () => {
    component.errorResponse.set({
      succeeded: false,
      errors: [
        {
          code: "DuplicateUserName",
          description: "Username already exists",
        },
      ],
    });

    expect(component.hasDuplicateError("DuplicateUserName")).toBe(true);
  });

  it("should not detect a different error", () => {
    component.errorResponse.set({
      succeeded: false,
      errors: [
        {
          code: "DuplicateUserName",
          description: "Username already exists",
        },
      ],
    });

    expect(component.hasDuplicateError("SomeOtherError")).toBe(false);
  });

  it("should submit a valid form", () => {
    component.form.setValue({
      userName: "mushroom",
      email: "mushroom@example.com",
      password: "password123!",
      confirm: "password123!",
    });

    const formData = component.form.value;

    component.onSubmit();

    expect(authService.createUser).toHaveBeenCalledWith(formData);
    expect(authService.loginUser).toHaveBeenCalledWith(formData);
    expect(authService.saveToken).toHaveBeenCalledWith("test-token");
    expect(router.navigateByUrl).toHaveBeenCalledWith("/");
  });

  it("should not submit an invalid form", () => {
    component.onSubmit();

    expect(authService.createUser).not.toHaveBeenCalled();
    expect(authService.loginUser).not.toHaveBeenCalled();
    expect(authService.saveToken).not.toHaveBeenCalled();
  });
});
