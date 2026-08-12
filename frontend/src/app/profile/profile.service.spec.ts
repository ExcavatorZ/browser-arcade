import { TestBed } from "@angular/core/testing";

import { ProfileDetailInfo, ProfileInfo, ProfileService } from "./profile.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";

describe("ProfileService", () => {
  let service: ProfileService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ProfileService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it("should get profile overview", () => {
    const profileInfo: ProfileInfo = {
      memoryGames: 1,
      quizGames: 2,
      snakeGames: 3,
      invaderGames: 4,
    };

    service.getProfileOverview("mushroom").subscribe((response) => {
      expect(response).toEqual(profileInfo);
    });

    const req = httpTesting.expectOne(`${service.url}/overview/mushroom`);

    expect(req.request.method).toBe("GET");

    req.flush(profileInfo);
  });

  it("should get profile details", () => {
    const profileDetailInfo: ProfileDetailInfo = {
      quizGames: 1,
      memoryGames: 2,
      snakeGames: 3,
      invaderGames: 4,
      commonMemoSize: "4x4",
      commonQuizLength: 5,
      commonQuizDifficulty: 1,
      commonSnakeScore: 40,
      snakeHighScore: 56,
      commonInvaderScore: 150,
      invaderHighScore: 200,
    };

    service.getProfileDetails("mushroom").subscribe((response) => {
      expect(response).toEqual(profileDetailInfo);
    });

    const req = httpTesting.expectOne(`${service.url}/details/mushroom`);

    expect(req.request.method).toBe("GET");

    req.flush(profileDetailInfo);
  });
});
