import { Component, inject, OnInit, signal } from "@angular/core";
import { QuizItem, QuizService } from "../quiz.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-quiz-play",
  imports: [CommonModule],
  templateUrl: "./quiz-play.html",
})
export class QuizPlay implements OnInit {
  service = inject(QuizService);

  questions: QuizItem[] = [];
  completed = signal(false);
  score = signal(0);
  progress = signal(0);

  ngOnInit(): void {
    const amount = this.service.amount;
    const difficulty = this.service.difficulty;

    this.service.getQuestions(amount, difficulty).subscribe((response) => {
      this.questions = response;
      this.currentQuestion.set(this.questions[0]);
    });
  }

  // Gameplay logic

  currentQuestion = signal<QuizItem | null>(null);
  answered = signal(false);
  correct = signal(false);

  selectAnswer = (answer: string) => {
    if (this.answered()) {
      return;
    }

    this.answered.set(true);

    const choices = [
      this.currentQuestion()!.answer0,
      this.currentQuestion()!.answer1,
      this.currentQuestion()!.answer2,
      this.currentQuestion()!.answer3,
    ];
    const correct = this.currentQuestion()!.correctIndex;

    for (let i = 0; i < choices.length; i++) {
      if (answer == choices[correct]) {
        this.score.set(this.score() + 1);
        this.correct.set(true);
        break;
      }
    }
    this.progress.set(this.progress() + 1);
    if (this.progress() == this.questions.length) {
      this.endGame();
    }
  };

  endGame = () => {
    this.completed.set(true);
    console.log("Game ended.");
  };

  renderQuestion = () => {
    this.currentQuestion.set(this.questions[this.progress()]);
    this.answered.set(false);
    this.correct.set(false);
  };

  restart = () => {
    location.reload();
  };
}
