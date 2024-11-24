import { Component, input } from '@angular/core';

@Component({
  selector: 'app-score',
  standalone: true,
  imports: [],
  templateUrl: './score.component.html',
  styleUrl: './score.component.scss',
})
export class ScoreComponent {
  public readonly currentScore = input<number>();
  public readonly highestScore = input<number>();
}