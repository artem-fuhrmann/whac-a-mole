import { inject, Injectable, OnInit } from '@angular/core';
import { GameState, Mole, MoleStatus } from './state';

@Injectable({
  providedIn: 'root',
})
export class MoleService {
  public readonly state = inject(GameState);
  private readonly _innactiveMols: Mole[] = [];

  constructor() {}

  private calculateActiveMall(currentActiveMollPressed: Mole): Mole[] {
    const pressedIndex = currentActiveMollPressed.index;
    const moles = this.state.moles();
    const updatedMoles = moles.map((mole) =>
      mole.index === pressedIndex ? { ...mole, state: 0 } : mole
    );

    const inactiveMoles = updatedMoles.filter(
      (mole) => mole.state === 0 && mole.index !== pressedIndex
    );

    // if (inactiveMoles.length > 0) {
    //   const randomIndex =
    //     inactiveMoles[Math.floor(Math.random() * inactiveMoles.length)].index;

    //   return updatedMoles.map((mole) =>
    //     mole.index === randomIndex ? { ...mole, state: 1 } : mole
    //   );
    // }
    this.state.updateMols(updatedMoles);

    return updatedMoles;
  }

  public updateMolsAfterTrigger(mole: Mole) {
    const updatedMolls = this.calculateActiveMall(mole);
    this.state.updateMols(updatedMolls);
  }

  // public updateMolesByLifeTime(timer: number): void {
  //   const updatedMoles = this.state.moles().map((mole) => {
  //     this.updateMolsAfterTrigger(mole);
  //     // const updatedMolls = this.calculateActiveMall(mole);
  //     // this.state.updateMols(updatedMolls);

  //     // console.log(updatedMolls);
  //     if (mole.lifeEnd && mole.lifeEnd > timer) {
  //       return {
  //         ...mole,
  //         state: MoleStatus.Inactive,
  //         lifeEnd: undefined,
  //       };
  //     }
  //     return mole;
  //   });
  // }

  private _checkAndUpdateMoles() {
    const currentTime = this.state.timer();
    const updatedMoles = this.state.moles().map((mole) => {
      if (mole.state === MoleStatus.Active && mole.lifeEnd! > currentTime) {
        this.state.decrementScore();
        return {
          ...mole,
          state: MoleStatus.Inactive,
          lifeEnd: undefined,
        };
      }
      return mole;
    });
    this.state.updateMols(updatedMoles);
  }

  public updateGameField() {
    this._checkAndUpdateMoles();
    const shouldUpdate = Math.random() > 0.2;
    if (!shouldUpdate) return;

    const inactiveMoles = this.state
      .moles()
      .filter((mole) => mole.state === MoleStatus.Inactive);

    if (inactiveMoles.length === 0) return;

    const randomIndex = Math.floor(Math.random() * inactiveMoles.length);
    const moleToActivate = inactiveMoles[randomIndex];
    const randomLifeTime = Math.floor(Math.random() * 3) + 1;

    const updatedMoles = this.state.moles().map((mole) =>
      mole.index === moleToActivate.index
        ? {
            ...mole,
            state: MoleStatus.Active,
            lifeEnd:
              this.state.timer() - randomLifeTime < 0
                ? 0
                : this.state.timer() - randomLifeTime,
          }
        : mole
    );
    this.state.updateMols(updatedMoles);
  }
}
