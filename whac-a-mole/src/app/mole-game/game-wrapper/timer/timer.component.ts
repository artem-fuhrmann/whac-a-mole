import {
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  input,
} from '@angular/core';
import { GameState } from '../../mole-game.state';
import { timer } from 'rxjs';
import { MoleService } from '../../mole-game.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  providers: [MoleService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  $timer = input<number>();
  public readonly moleService = inject(MoleService);

  private readonly state = inject(GameState);

  constructor() {
    effect(
      () => {
        timer(1000).subscribe(() => {
          this.moleService.updateGameField();
          this.state.decrementTimer();
        });

        if (this.$timer() === 0) {
          if (this.state.currentScore() > this.state.highestScore()) {
            this.state.updateHighestScore();
          }
          this.state.stopGame();
        }
      },
      { allowSignalWrites: true }
    );
  }
}
