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
