import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { randomizer } from './randomizer';

export type State = {
  highestScore: number;
  currentScore: number;
  resetTime: boolean;
  moles: Array<Moles>;
  timer: number;
  started: boolean;
};

export interface Moles {
  state: MoleStatus;
  index: number;
}

export enum MoleStatus {
  Active = 1,
  Inactive = 0,
}

const INITIAL_STATE: State = {
  highestScore: 0,
  currentScore: 0,
  resetTime: false,
  moles: randomizer(),
  timer: 30,
  started: false,
};

export const GameState = signalStore(
  withState(INITIAL_STATE),
  withMethods((store) => ({
    startGame() {
      patchState(store, (state) => ({
        ...state,
        started: true,
        timer: 30,
      }));
    },
    stopGame() {
      patchState(store, (state) => ({
        ...state,
        started: false,
        resetTime: true,
      }));
    },
    resetGame() {
      patchState(store, (state) => ({
        ...state,
        resetTime: false,
        currentScore: 0,
        moles: randomizer(),
      }));
    },
    incrementScore() {
      patchState(store, (state) => ({
        ...state,
        currentScore: state.currentScore + 1,
      }));
    },
    decrementTimer() {
      console.log('decrementTimer');
      patchState(store, (state) => ({
        ...state,
        timer: state.timer - 1,
      }));
    },
    updateHighestScore() {
      patchState(store, (state) => ({
        ...state,
        highestScore: state.currentScore,
      }));
    },
    toggleMole(index: number) {
      patchState(store, (state) => ({
        ...state,
        moles: state.moles.map((mole) => {
          if (mole.index === index) {
            return {
              ...mole,
              state:
                mole.state === MoleStatus.Active
                  ? MoleStatus.Inactive
                  : MoleStatus.Active,
            };
          }
          return mole;
        }),
      }));
    },
  }))
);
