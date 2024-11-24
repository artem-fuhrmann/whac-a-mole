import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./game-wrapper/game-wrapper.component').then(
        (m) => m.GameWrapperComponent
      ),
  },
];
