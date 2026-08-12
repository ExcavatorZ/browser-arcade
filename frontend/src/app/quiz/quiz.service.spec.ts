import { TestBed } from "@angular/core/testing";

import { QuizService } from "./quiz.service";
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";

describe("QuizService", () => {
  let service: QuizService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(QuizService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it("should get default quiz info", () => {
    expect(service.amount).toBe("5");
    expect(service.difficulty).toBe("2");
  });

  it("should save quiz info", () => {
    service.saveQuizInfo("40", "3");
    expect(service.amount).toBe("40");
    expect(service.difficulty).toBe("3");
  });

  it("should get the questions", () => {
    const questions = [
      {
        id: 1,
        question: "test question0",
        answer0: "test answer0",
        answer1: "test answer1",
        answer2: "test answer2",
        answer3: "test answer3",
        correctIndex: 1,
        difficulty: 1,
      },
    ];

    service.getQuestions("5", "1").subscribe((response) => {
      expect(response).toEqual(questions);
    });

    const req = httpTesting.expectOne(`${service.url}?amount=5&difficulty=1`);

    expect(req.request.method).toBe("GET");

    req.flush(questions);
  });

  it("should get the leaderboard", () => {
    service.getLeaderboard(5, 1).subscribe();

    const req = httpTesting.expectOne(`${service.url}/leaderboard?totalQuestions=5&difficulty=1`);

    expect(req.request.method).toBe("GET");

    req.flush([]);
  });

  it("should save the game result", () => {
    service.saveResult({
      score: 5,
      totalQuestions: 5,
      difficulty: 1,
      timeTaken: 30,
    });

    const req = httpTesting.expectOne(`${service.url}/save`);

    expect(req.request.method).toBe("POST");
    expect(req.request.body).toEqual({
      score: 5,
      totalQuestions: 5,
      difficulty: 1,
      timeTaken: 30,
    });

    req.flush({});
  });
});
