import { TestBed } from "@angular/core/testing";
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from "@angular/common/http";

import { authInterceptor } from "./auth-interceptor";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { AuthService } from "./auth-service";

describe("authInterceptor", () => {
  let httpTesting: HttpTestingController;
  let http: HttpClient;

  const authService = {
    getToken: vi.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        {
          provide: AuthService,
          useValue: authService,
        },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it("should add authorization when token exists", () => {
    authService.getToken.mockReturnValue("test-token");

    http.get("/test").subscribe();

    const req = httpTesting.expectOne("/test");

    expect(req.request.headers.get("Authorization")).toBe("Bearer test-token");

    req.flush({});
  });

  it("should not add authorization when token doesn't exist", () => {
    authService.getToken.mockReturnValue(null);

    http.get("/test").subscribe();

    const req = httpTesting.expectOne("/test");

    expect(req.request.headers.has("Authorizarion")).toBe(false);

    req.flush({});
  });
});
