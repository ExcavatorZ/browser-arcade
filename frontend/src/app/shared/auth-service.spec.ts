import { TestBed } from "@angular/core/testing";

import { AuthService } from "./auth-service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";

describe("AuthService", () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it("should retrieve saved token", () => {
    localStorage.setItem("token", "test-token");
    expect(service.getToken()).toBe("test-token");
  });

  it("should delete saved token", () => {
    localStorage.setItem("token", "test-token");
    service.deleteToken();
    expect(service.getToken()).toBeNull();
    expect(service.loggedIn()).toBeFalsy();
  });

  it("should create user", () => {
    const formData = {
      userName: "mushroom",
    };

    service.createUser(formData).subscribe();

    const req = httpTesting.expectOne(`${service.url}/User/signup`);

    expect(req.request.method).toBe("POST");

    req.flush({});
  });

  it("should log in user", () => {
    const formData = {
      userName: "mushroom",
    };

    service.loginUser(formData).subscribe();

    const req = httpTesting.expectOne(`${service.url}/User/login`);

    expect(req.request.method).toBe("POST");

    req.flush({});
  });
});
