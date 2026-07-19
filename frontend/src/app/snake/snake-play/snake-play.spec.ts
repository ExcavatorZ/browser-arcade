import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SnakePlay } from "./snake-play";

describe("SnakePlay", () => {
  let component: SnakePlay;
  let fixture: ComponentFixture<SnakePlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakePlay],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakePlay);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
