import { ComponentFixture, TestBed } from "@angular/core/testing";

import { MemoLeaderboard } from "./memo-leaderboard";

describe("MemoLeaderboard", () => {
  let component: MemoLeaderboard;
  let fixture: ComponentFixture<MemoLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MemoLeaderboard],
    }).compileComponents();

    fixture = TestBed.createComponent(MemoLeaderboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
