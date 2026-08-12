import { TestBed } from "@angular/core/testing";

import { SnakeLeaderboardItem, SnakeService } from "./snake.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe("SnakeService", () => {
  let service: SnakeService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SnakeService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it("should get the leaderboard", () => {
    const leaderboard: SnakeLeaderboardItem[] = [
      {
        id: 1,
        score: 5,
        date: "test date",
        user: { userName: "mushroom" },
      },
    ];

    service.getLeaderboard().subscribe((response) => {
      expect(response).toEqual(leaderboard);
    });

    const req = httpTesting.expectOne(`${service.url}/leaderboard`);

    expect(req.request.method).toBe("GET");

    req.flush(leaderboard);
  });

  it("should save the game result", () => {
    service.saveResult(30);

    const req = httpTesting.expectOne(`${service.url}/save`);

    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(30);

    req.flush({});
  });
});
