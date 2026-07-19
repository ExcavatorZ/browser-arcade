import { ComponentFixture, TestBed } from "@angular/core/testing";

import { SnakeInstruction } from "./snake-instruction";

describe("SnakeInstruction", () => {
  let component: SnakeInstruction;
  let fixture: ComponentFixture<SnakeInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeInstruction],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakeInstruction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
