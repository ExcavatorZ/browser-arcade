import { TestBed } from "@angular/core/testing";

import { authGuard } from "./auth-guard";
import { provideRouter, Router } from "@angular/router";
import { AuthService } from "./auth-service";

describe("authGuard", () => {
  const authService = {
    loggedIn: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    });
  });

  it("should allow logged in users", () => {
    authService.loggedIn.mockReturnValue(true);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    expect(result).toBe(true);
  });

  it("should redirect logged out users", () => {
    authService.loggedIn.mockReturnValue(false);

    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    const router = TestBed.inject(Router);

    expect(result).toEqual(router.createUrlTree(["/unauthorized"]));
  });
});
