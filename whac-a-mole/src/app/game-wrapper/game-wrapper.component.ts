import { Component } from '@angular/core';
import { MoleComponent } from '../mole/mole.component';
import { ScoreComponent } from '../score/score.component';

@Component({
  selector: 'app-game-wrapper',
  standalone: true,
  imports: [MoleComponent, ScoreComponent],
  templateUrl: './game-wrapper.component.html',
  styleUrl: './game-wrapper.component.scss',
})
export class GameWrapperComponent {
  gameStarted = false;
  molesArray = Array(6).fill({ isActive: false });
  currentScore = 0;
  highestScore = 0;
  timeLeft = 30;

  moles() {
    return this.molesArray;
  }

  startGame() {
    this.gameStarted = true;
    this.timeLeft = 30;
    this.currentScore = 0;
  }
}
