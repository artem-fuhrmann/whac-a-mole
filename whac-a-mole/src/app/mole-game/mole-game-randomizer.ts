import { inject } from '@angular/core';
import { GameState } from './mole-game.state';
import { Mole, State } from './mole-game.entities';

export const randomizer = (moleState: State): Mole[] => {
  const moles = [];

  for (let i = 0; i < 6; i++) {
    const currentMollStatus = Math.random() > 0.5 ? 1 : 0;
    const randomLifeTime = Math.floor(Math.random() * 3) + 1;

    moles.push({
      state: currentMollStatus,
      index: i,
      lifeEnd:
        currentMollStatus === 1
          ? moleState.timer - randomLifeTime < 0
            ? 0
            : moleState.timer - randomLifeTime
          : undefined,
    });
  }
  return moles;
};
