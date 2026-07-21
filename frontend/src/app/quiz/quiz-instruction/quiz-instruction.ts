import { Component, inject } from "@angular/core";
import { QuizService } from "../quiz.service";

@Component({
  selector: "app-quiz-instruction",
  imports: [],
  templateUrl: "./quiz-instruction.html",
})
export class QuizInstruction {
  service = inject(QuizService);

  testQuestions = () => {
    this.service.getQuestions(5, 1).subscribe((response) => {
      console.log(response);
    });
  };
}
