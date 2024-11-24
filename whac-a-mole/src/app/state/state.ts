import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { randomizer } from './randomizer';
import { inject } from '@angular/core';
import { MoleService } from './mole.service';

export type State = {
  highestScore: number;
  currentScore: number;
  resetTime: boolean;
  moles: Array<Mole>;
  timer: number;
  started: boolean;
  stopped: boolean;
};

export interface Mole {
  state: MoleStatus;
  index: number;
  lifeEnd?: number;
}

export enum MoleStatus {
  Active = 1,
  Inactive = 0,
}

const INITIAL_STATE: State = {
  highestScore: 0,
  currentScore: 0,
  resetTime: false,
  moles: [],
  timer: 30,
  started: false,
  stopped: false,
};

export const GameState = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withMethods((store) => ({
    startGame() {
      patchState(store, (state) => ({
        ...state,
        moles: randomizer(state),
        started: true,
        stopped: false,
        timer: 30,
      }));
    },
    stopGame() {
      patchState(store, (state) => ({
        ...state,
        currentScore: 0,
        started: false,
        stopped: true,
        resetTime: true,
      }));
    },
    resetGame() {
      patchState(store, (state) => ({
        ...state,
        resetTime: false,
        currentScore: 0,
        moles: randomizer(state),
      }));
    },
    incrementScore() {
      patchState(store, (state) => ({
        ...state,
        currentScore: state.currentScore + 1,
      }));
    },
    decrementScore() {
      patchState(store, (state) => ({
        ...state,
        currentScore: state.currentScore - 1,
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
              lifeEnd:
                mole.state === MoleStatus.Active
                  ? mole.state - Math.floor(Math.random() * 3) + 1 < 0
                    ? 0
                    : state.timer - Math.floor(Math.random() * 3) + 1
                  : undefined,
            };
          }
          return mole;
        }),
      }));
    },
    updateMols(newMalsArray: Mole[]) {
      patchState(store, (state) => ({
        ...state,
        moles: newMalsArray,
      }));
    },
  }))
);
