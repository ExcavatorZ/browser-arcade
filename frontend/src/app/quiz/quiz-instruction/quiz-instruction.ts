import { Component, inject } from "@angular/core";
import { QuizService } from "../quiz.service";
import { RouterLink } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-quiz-instruction",
  imports: [RouterLink, FormsModule],
  templateUrl: "./quiz-instruction.html",
})
export class QuizInstruction {
  service = inject(QuizService);

  amountInput = "10";
  difficultyInput = "2";
}
