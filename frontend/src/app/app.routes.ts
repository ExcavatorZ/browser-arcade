import { Routes } from "@angular/router";
import { Homepage } from "./homepage/homepage";
import { Games } from "./games/games";
import { MemoInstruction } from "./memo/memo-instruction/memo-instruction";
import { MemoPlay } from "./memo/memo-play/memo-play";
import { SnakeInstruction } from "./snake/snake-instruction/snake-instruction";
import { SnakePlay } from "./snake/snake-play/snake-play";
import { InvaderInstruction } from "./invader/invader-instruction/invader-instruction";
import { InvaderPlay } from "./invader/invader-play/invader-play";
import { Login } from "./login/login/login";
import { Signup } from "./login/signup/signup";
import { QuizInstruction } from "./quiz/quiz-instruction/quiz-instruction";
import { QuizPlay } from "./quiz/quiz-play/quiz-play";
import { MemoLeaderboard } from "./memo/memo-leaderboard/memo-leaderboard";
import { QuizLeaderboard } from "./quiz/quiz-leaderboard/quiz-leaderboard";
import { SnakeLeaderboard } from "./snake/snake-leaderboard/snake-leaderboard";
import { InvaderLeaderboard } from "./invader/invader-leaderboard/invader-leaderboard";
import { ProfileOverview } from "./profile/profile-overview/profile-overview";

export const routes: Routes = [
  {
    path: "",
    component: Homepage,
    title: "Home | Browser Arcade",
  },
  {
    path: "games",
    component: Games,
    title: "Game List | Browser Arcade",
  },
  {
    path: "login",
    component: Login,
    title: "Login | Browser Arcade",
  },
  {
    path: "signup",
    component: Signup,
    title: "Sign up | Browser Arcade",
  },
  {
    path: "profile/:userName",
    component: ProfileOverview,
    title: "Profile | Browser Arcade",
  },
  {
    path: "memo",
    children: [
      {
        path: "",
        component: MemoInstruction,
        title: "Memory Game | Browser Arcade",
      },
      {
        path: "play",
        component: MemoPlay,
        title: "Memory Game | Browser Arcade",
      },
      {
        path: "leaderboard",
        component: MemoLeaderboard,
        title: "Memory Game | Browser Arcade",
      },
    ],
  },
  {
    path: "quiz",
    children: [
      {
        path: "",
        component: QuizInstruction,
        title: "Quiz | Browser Arcade",
      },
      {
        path: "play",
        component: QuizPlay,
        title: "Quiz | Browser Arcade",
      },
      {
        path: "leaderboard",
        component: QuizLeaderboard,
        title: "Quiz | Browser Arcade",
      },
    ],
  },
  {
    path: "snake",
    children: [
      {
        path: "",
        component: SnakeInstruction,
        title: "Debugger | Browser Arcade",
      },
      {
        path: "play",
        component: SnakePlay,
        title: "Debugger | Browser Arcade",
      },
      {
        path: "leaderboard",
        component: SnakeLeaderboard,
        title: "Debugger | Browser Arcade",
      },
    ],
  },
  {
    path: "invader",
    children: [
      {
        path: "",
        component: InvaderInstruction,
        title: "Server Invaders | Browser Arcade",
      },
      {
        path: "play",
        component: InvaderPlay,
        title: "Server Invaders | Browser Arcade",
      },
      {
        path: "leaderboard",
        component: InvaderLeaderboard,
        title: "Server Invaders | Browser Arcade",
      },
    ],
  },
];
