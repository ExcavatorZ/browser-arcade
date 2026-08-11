import { ComponentFixture, TestBed } from "@angular/core/testing";
import { provideRouter } from "@angular/router";
import { HttpTestingController } from "@angular/common/http/testing";
import { of } from "rxjs";

import { QuizPlay } from "./quiz-play";
import { QuizService } from "../quiz.service";

describe("QuizPlay", () => {
  let component: QuizPlay;
  let fixture: ComponentFixture<QuizPlay>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuizPlay],
      providers: [
        provideRouter([]),
        {
          provide: QuizService,
          useValue: {
            amount: "5",
            difficulty: "2",
            getQuestions: () =>
              of([
                {
                  id: 1,
                  question: "Test question",
                  answer0: "Test answer 0",
                  answer1: "Test answer 1",
                  answer2: "Test answer 2",
                  answer3: "Test answer 3",
                  correctIndex: 0,
                  difficulty: 2,
                },
              ]),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(QuizPlay);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
