import { Component, input } from '@angular/core';

@Component({
  selector: 'app-mole',
  standalone: true,
  imports: [],
  templateUrl: './mole.component.html',
  styleUrl: './mole.component.scss',
})
export class MoleComponent {
  public readonly isActive = input.required<boolean>();

  handleClick() {
    if (this.isActive()) {
      console.log('Mole clicked!');
    }
  }
}
