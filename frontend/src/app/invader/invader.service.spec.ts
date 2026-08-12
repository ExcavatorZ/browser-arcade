import { TestBed } from "@angular/core/testing";

import { InvaderLeaderboardItem, InvaderService } from "./invader.service";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { provideHttpClient } from "@angular/common/http";

describe("InvaderService", () => {
  let service: InvaderService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(InvaderService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it("should get the leaderboard", () => {
    const leaderboard: InvaderLeaderboardItem[] = [
      {
        id: 1,
        score: 500,
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
    service.saveResult(60);

    const req = httpTesting.expectOne(`${service.url}/save`);

    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual(60);

    req.flush({});
  });
});
