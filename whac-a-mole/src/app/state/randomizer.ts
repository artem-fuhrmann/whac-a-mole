import { Moles } from './state';

export const randomizer = (): Moles[] => {
  const moles = [];
  for (let i = 0; i < 5; i++) {
    moles.push({
      state: Math.random() > 0.5 ? 1 : 0,
      index: i,
    });
  }
  return moles;
};
