import { Component, inject } from '@angular/core';
import { MoleComponent } from '../mole/mole.component';
import { ScoreComponent } from '../score/score.component';
import { GameState } from '../state/state';
import { TimerComponent } from '../timer/timer.component';

@Component({
  selector: 'app-game-wrapper',
  standalone: true,
  providers: [GameState],
  imports: [MoleComponent, ScoreComponent, TimerComponent],
  templateUrl: './game-wrapper.component.html',
  styleUrl: './game-wrapper.component.scss',
})
export class GameWrapperComponent {
  public readonly state = inject(GameState);

  gameStarted = true;
  molesArray = Array(6).fill({ isActive: false });
  currentScore = 0;
  highestScore = 0;
  timeLeft = 30;

  startGame() {
    this.state.startGame();
  }
}
