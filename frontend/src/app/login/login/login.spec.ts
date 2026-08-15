// AI tests.

import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";

import { Login } from "./login";
import { AuthService } from "../../shared/auth-service";
import { of, throwError } from "rxjs";

const authService = {
  loggedIn: vi.fn(() => false),
  loginUser: vi.fn(() => of({ token: "test-token" })),
  saveToken: vi.fn(),
};

describe("Login", () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    }).compileComponents();
  });

  it("should redirect logged in users", () => {
    authService.loggedIn.mockReturnValue(true);

    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, "navigateByUrl");

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;

    fixture.detectChanges();

    expect(navigateSpy).toHaveBeenCalledWith("/");
  });

  it("should login successfully", () => {
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    vi.spyOn(router, "navigateByUrl");
    component.form.setValue({
      email: "mushroom@example.com",
      password: "password123!",
    });

    const formData = component.form.value;

    component.onSubmit();

    expect(authService.loginUser).toHaveBeenCalledWith(formData);
    expect(authService.saveToken).toHaveBeenCalledWith("test-token");
    expect(router.navigateByUrl).toHaveBeenCalledWith("/");
  });

  it("should show user not found error", () => {
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    vi.spyOn(router, "navigateByUrl");
    authService.loginUser.mockReturnValue(
      throwError(() => ({
        status: 404,
        error: {
          message: "User not found",
        },
      })),
    );

    component.onSubmit();

    expect(component.notFoundErrorMessage()).toBe("User not found");
    expect(component.passwordErrorMessage()).toBe("");
  });

  it("should show password error", () => {
    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    const router = TestBed.inject(Router);
    vi.spyOn(router, "navigateByUrl");
    authService.loginUser.mockReturnValue(
      throwError(() => ({
        status: 401,
        error: {
          message: "Incorrect password",
        },
      })),
    );

    component.onSubmit();

    expect(component.passwordErrorMessage()).toBe("Incorrect password");
    expect(component.notFoundErrorMessage()).toBe("");
  });
});
