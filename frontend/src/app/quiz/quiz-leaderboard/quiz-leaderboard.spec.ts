import { ComponentFixture, TestBed } from "@angular/core/testing";

import { QuizLeaderboard } from "./quiz-leaderboard";
import { QuizLeaderboardItem, QuizService } from "../quiz.service";
import { of } from "rxjs";
import { provideRouter } from "@angular/router";

const leaderboard: QuizLeaderboardItem[] = [];

const getLeaderboard = vi.fn(() => of(leaderboard));

describe("QuizLeaderboard", () => {
  let component: QuizLeaderboard;
  let fixture: ComponentFixture<QuizLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizLeaderboard],
      providers: [
        provideRouter([]),
        {
          provide: QuizService,
          useValue: {
            getLeaderboard,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizLeaderboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be leaderboard", () => {
    expect(component.leaderboard()).toEqual(leaderboard);
  });

  it("should change the leaderboard amount filter", () => {
    component.applyAmount("15");

    expect(component.selectedAmount()).toBe(15);
  });

  it("should change the leaderboard difficulty filter", () => {
    component.applyDifficulty(3);

    expect(component.selectedDifficulty()).toBe(3);
  });

  it("should get the leaderboard with the selected filters", () => {
    getLeaderboard.mockClear();

    component.applyAmount("15");
    component.applyDifficulty(3);
    component.setLeaderboard();

    expect(getLeaderboard).toHaveBeenCalledWith(15, 3);
  });

  it("should not change the filters when the same filters are selected", () => {
    component.applyAmount("10");
    component.applyDifficulty(2);

    expect(component.selectedAmount()).toBe(10);
    expect(component.selectedDifficulty()).toBe(2);
  });
});
