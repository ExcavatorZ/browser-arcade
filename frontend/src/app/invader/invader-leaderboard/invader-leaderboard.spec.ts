import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InvaderLeaderboard } from "./invader-leaderboard";
import { InvaderLeaderboardItem, InvaderService } from "../invader.service";
import { of } from "rxjs";
import { provideRouter } from "@angular/router";

const leaderboard: InvaderLeaderboardItem[] = [];

const getLeaderboard = vi.fn(() => of(leaderboard));

describe("InvaderLeaderboard", () => {
  let component: InvaderLeaderboard;
  let fixture: ComponentFixture<InvaderLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvaderLeaderboard],
      providers: [
        provideRouter([]),
        {
          provide: InvaderService,
          useValue: {
            getLeaderboard,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(InvaderLeaderboard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should be leaderboard", () => {
    expect(component.leaderboard()).toEqual(leaderboard);
  });
});
