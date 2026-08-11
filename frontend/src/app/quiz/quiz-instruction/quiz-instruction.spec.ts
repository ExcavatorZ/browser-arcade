import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";

import { QuizInstruction } from "./quiz-instruction";

describe("QuizInstruction", () => {
  let component: QuizInstruction;
  let fixture: ComponentFixture<QuizInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizInstruction],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizInstruction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should render the memo instruction text", () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain("Click on the correct answer");
  });
});
