import { inject, Injectable } from '@angular/core';
import { GameState } from './mole-game.state';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  public readonly state = inject(GameState);

  constructor() {}
}
