import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { randomizer } from './mole-game-randomizer';
import { computed, inject } from '@angular/core';
import { MoleService } from './mole-game.service';
import { Mole, MoleStatus, State } from './mole-game.entities';

const INITIAL_STATE: State = {
  highestScore: 0,
  currentScore: 0,
  resetTime: false,
  moles: [],
  timer: 5,
  started: false,
  stopped: false,
};

export const GameState = signalStore(
  { providedIn: 'root' },
  withState(INITIAL_STATE),
  withComputed(({ ...state }) => ({
    initialGame: computed(() => !state.started() && !state.stopped()),
    gameStarted: computed(() => state.started() && !state.stopped()),
    gameReplay: computed(() => !state.started() && state.stopped()),
  })),
  withMethods((store) => ({
    startGame() {
      patchState(store, (state) => ({
        ...state,
        moles: randomizer(state),
        started: true,
        stopped: false,
        timer: 5,
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
