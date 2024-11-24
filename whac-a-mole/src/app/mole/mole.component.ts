import { Component, input } from '@angular/core';
import { Moles } from '../state/state';

@Component({
  selector: 'app-mole',
  standalone: true,
  imports: [],
  templateUrl: './mole.component.html',
  styleUrl: './mole.component.scss',
})
export class MoleComponent {
  public readonly mole = input<Moles>();

  handleClick() {
    return;
  }
}
