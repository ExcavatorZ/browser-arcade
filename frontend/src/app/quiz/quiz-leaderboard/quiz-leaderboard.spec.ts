import { ComponentFixture, TestBed } from "@angular/core/testing";

import { QuizLeaderboard } from "./quiz-leaderboard";

describe("QuizLeaderboard", () => {
  let component: QuizLeaderboard;
  let fixture: ComponentFixture<QuizLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizLeaderboard],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizLeaderboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
