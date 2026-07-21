import { Component, inject, OnInit, signal } from "@angular/core";
import { QuizItem, QuizService } from "../quiz.service";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

interface answerOption {
  text: string;
  correct: boolean;
}

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
      this.renderQuestion();
    });
  }

  // Gameplay logic

  currentQuestion = signal<QuizItem | null>(null);
  selectedAnswer = signal<answerOption | null>(null);
  answered = signal(false);
  correct = signal(false);
  choices = signal<answerOption[]>([]);

  selectAnswer = (answer: answerOption) => {
    if (this.answered()) {
      return;
    }

    this.selectedAnswer.set(answer);
    this.answered.set(true);

    if (answer.correct) {
      this.score.set(this.score() + 1);
      this.correct.set(true);
    }

    this.progress.set(this.progress() + 1);
    if (this.progress() == this.questions.length) {
      this.endGame();
    }
  };

  getAnswerClass(answer: answerOption) {
    if (!this.answered()) {
      return "bg-indigo-200 hover:bg-indigo-300";
    }

    if (answer.correct) {
      return "bg-green-500 text-white";
    }

    if (answer == this.selectedAnswer()) {
      return "bg-red-500 text-white";
    }

    return "bg-indigo-200";
  }

  endGame = () => {
    this.completed.set(true);
    console.log("Game ended.");
  };

  shuffle = (array: {}[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  renderQuestion = () => {
    this.currentQuestion.set(this.questions[this.progress()]);
    const q = this.currentQuestion()!;
    let answers = [
      { text: q.answer0, correct: q.correctIndex == 0 },
      { text: q.answer1, correct: q.correctIndex == 1 },
      { text: q.answer2, correct: q.correctIndex == 2 },
      { text: q.answer3, correct: q.correctIndex == 3 },
    ];

    this.shuffle(answers);
    this.choices.set(answers);
    this.answered.set(false);
    this.correct.set(false);
  };

  restart = () => {
    location.reload();
  };
}
