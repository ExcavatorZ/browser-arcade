import { Component, inject, OnInit, signal } from "@angular/core";
import { QuizItem, QuizService } from "../quiz.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-quiz-play",
  imports: [CommonModule, RouterLink],
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
      this.choices.set([
        this.questions[0].answer0,
        this.questions[0].answer1,
        this.questions[0].answer2,
        this.questions[0].answer3,
      ]);
    });
  }

  // Gameplay logic

  currentQuestion = signal<QuizItem | null>(null);
  selectedAnswer = signal<string | null>(null);
  answered = signal(false);
  correct = signal(false);
  choices = signal<string[]>([]);

  selectAnswer = (answer: string) => {
    if (this.answered()) {
      return;
    }

    this.selectedAnswer.set(answer);
    this.answered.set(true);

    const correct = this.currentQuestion()!.correctIndex;

    if (answer == this.choices()[correct]) {
      this.score.set(this.score() + 1);
      this.correct.set(true);
    }

    this.progress.set(this.progress() + 1);
    if (this.progress() == this.questions.length) {
      this.endGame();
    }
  };

  getAnswerClass(index: number, answer: string) {
    if (!this.answered()) {
      return "bg-indigo-200 hover:bg-indigo-300";
    }

    if (index === this.currentQuestion()!.correctIndex) {
      return "bg-green-500 text-white";
    }

    if (answer === this.selectedAnswer()) {
      return "bg-red-500 text-white";
    }

    return "bg-indigo-200";
  }

  endGame = () => {
    this.completed.set(true);
    console.log("Game ended.");
  };

  renderQuestion = () => {
    this.currentQuestion.set(this.questions[this.progress()]);
    this.choices.set([
      this.currentQuestion()!.answer0,
      this.currentQuestion()!.answer1,
      this.currentQuestion()!.answer2,
      this.currentQuestion()!.answer3,
    ]);
    this.answered.set(false);
    this.correct.set(false);
  };

  restart = () => {
    location.reload();
  };
}
