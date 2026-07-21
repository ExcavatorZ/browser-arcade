import { ComponentFixture, TestBed } from "@angular/core/testing";

import { QuizInstruction } from "./quiz-instruction";

describe("QuizInstruction", () => {
  let component: QuizInstruction;
  let fixture: ComponentFixture<QuizInstruction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizInstruction],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizInstruction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
