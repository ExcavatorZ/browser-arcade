import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SnakeLeaderboard } from "./snake-leaderboard";
import { SnakeLeaderboardItem, SnakeService } from "../snake.service";
import { of } from "rxjs";
import { provideRouter } from "@angular/router";

const leaderboard: SnakeLeaderboardItem[] = [];

const getLeaderboard = vi.fn(() => of(leaderboard));

describe("SnakeLeaderboard", () => {
  let component: SnakeLeaderboard;
  let fixture: ComponentFixture<SnakeLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeLeaderboard],
      providers: [
        provideRouter([]),
        {
          provide: SnakeService,
          useValue: {
            getLeaderboard,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakeLeaderboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be leaderboard", () => {
    expect(component.leaderboard()).toEqual(leaderboard);
  });
});
