import { TestBed } from "@angular/core/testing";

import { MemoService } from "./memo.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";

describe("MemoService", () => {
  let service: MemoService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(MemoService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it("should save board size as 8", () => {
    service.saveBoardSize("8");
    expect(service.getBoardSize()).toBe(8);
  });

  it("should save board size as 18", () => {
    service.saveBoardSize("18");
    expect(service.getBoardSize()).toBe(18);
  });

  it("should get correct pic amount for 8-board", () => {
    const pics = service.getPics();
    expect(pics.length).toBe(16);
  });

  it("should get correct pic amount for 18-board", () => {
    service.saveBoardSize("18");
    const pics = service.getPics();
    expect(pics.length).toBe(36);
  });

  it("should get the leaderboard", () => {
    service.getLeaderboard("18").subscribe();

    const req = httpTesting.expectOne(`${service.url}/leaderboard?boardSize=18`);

    expect(req.request.method).toBe("GET");

    req.flush([]);
  });

  it("should save the game result", () => {
    service.saveResult({
      moves: 56,
      boardSize: "18",
    });

    const req = httpTesting.expectOne(`${service.url}/save`);

    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual({
      moves: 56,
      boardSize: "18",
    });

    req.flush({});
  });
});
