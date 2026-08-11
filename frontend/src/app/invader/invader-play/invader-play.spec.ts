import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { InvaderPlay } from "./invader-play";

describe("InvaderPlay", () => {
  let component: InvaderPlay;
  let fixture: ComponentFixture<InvaderPlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvaderPlay],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(InvaderPlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
