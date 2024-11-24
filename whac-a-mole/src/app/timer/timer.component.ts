import { Component, effect, inject, input } from '@angular/core';
import { GameState } from '../state/state';
import { timer } from 'rxjs';
import { MoleService } from '../state/mole.service';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  providers: [MoleService],
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
          this.state.stopGame();
          if (this.state.currentScore() > this.state.highestScore()) {
            this.state.updateHighestScore();
          }
        }
      },
      { allowSignalWrites: true }
    );
  }
}
