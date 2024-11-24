import { Component, effect, inject, input } from '@angular/core';
import { GameState } from '../state/state';
import { timer } from 'rxjs';

@Component({
  selector: 'app-timer',
  standalone: true,
  imports: [],
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.scss',
})
export class TimerComponent {
  $timer = input<number>();

  readonly state = inject(GameState);

  constructor() {
    effect(
      () => {
        timer(1000).subscribe(() => {
          this.state.decrementTimer();

          console.log(this.$timer());
        });

        if (this.$timer() === 0) {
          this.state.stopGame();
        }
      },
      { allowSignalWrites: true }
    );
  }
}
