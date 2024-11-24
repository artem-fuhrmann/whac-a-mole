import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MoleComponent } from './mole/mole.component';
import { ScoreComponent } from './score/score.component';
import { GameState } from '../mole-game.state';
import { TimerComponent } from './timer/timer.component';

@Component({
  selector: 'app-game-wrapper',
  standalone: true,
  providers: [GameState],
  imports: [MoleComponent, ScoreComponent, TimerComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './game-wrapper.component.html',
  styleUrl: './game-wrapper.component.scss',
})
export class GameWrapperComponent {
  public readonly state = inject(GameState);

  protected readonly initialGame = this.state.initialGame;
  protected readonly gameStarted = this.state.gameStarted;
  protected readonly gameReplay = this.state.gameReplay;
  protected readonly molesArray = this.state.moles;
  protected readonly currentScore = this.state.currentScore;
  protected readonly highestScore = this.state.highestScore;

  startGame(): void {
    this.state.startGame();
  }
}
