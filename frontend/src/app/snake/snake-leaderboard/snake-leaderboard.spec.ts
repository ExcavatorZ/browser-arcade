import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SnakeLeaderboard } from "./snake-leaderboard";

describe("SnakeLeaderboard", () => {
  let component: SnakeLeaderboard;
  let fixture: ComponentFixture<SnakeLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeLeaderboard],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakeLeaderboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
