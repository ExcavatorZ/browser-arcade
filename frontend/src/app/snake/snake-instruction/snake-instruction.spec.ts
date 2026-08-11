import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { SnakeInstruction } from "./snake-instruction";

describe("SnakeInstruction", () => {
  let component: SnakeInstruction;
  let fixture: ComponentFixture<SnakeInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnakeInstruction],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SnakeInstruction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should render the snake instruction text", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain("Move around as a python");
  });
});
