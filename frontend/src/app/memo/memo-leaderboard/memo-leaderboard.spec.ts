import { ComponentFixture, TestBed } from "@angular/core/testing";
import { of } from "rxjs";

import { MemoLeaderboard } from "./memo-leaderboard";
import { MemoLeaderboardItem, MemoService } from "../memo.service";
import { provideRouter } from "@angular/router";

const leaderboard: MemoLeaderboardItem[] = [];

const getLeaderboard = vi.fn(() => of(leaderboard));

describe("MemoLeaderboard", () => {
  let component: MemoLeaderboard;
  let fixture: ComponentFixture<MemoLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoLeaderboard],
      providers: [
        provideRouter([]),
        {
          provide: MemoService,
          useValue: {
            getLeaderboard,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoLeaderboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be leaderboard", () => {
    expect(component.leaderboard()).toEqual(leaderboard);
  });

  it("should change the leaderboard filter", () => {
    getLeaderboard.mockClear();

    component.applyFilter("6x6");

    expect(component.selectedFilter()).toBe("6x6");
    expect(getLeaderboard).toHaveBeenCalledWith("6x6");
  });

  it("should not reload the leaderboard with the same filter", () => {
    getLeaderboard.mockClear();

    component.applyFilter("4x4");

    expect(getLeaderboard).not.toHaveBeenCalled();
  });
});
