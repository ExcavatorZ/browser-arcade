import { ComponentFixture, TestBed } from "@angular/core/testing";

import { InvaderLeaderboard } from "./invader-leaderboard";

describe("InvaderLeaderboard", () => {
  let component: InvaderLeaderboard;
  let fixture: ComponentFixture<InvaderLeaderboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvaderLeaderboard],
    }).compileComponents();

    fixture = TestBed.createComponent(InvaderLeaderboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
