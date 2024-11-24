import { Component, inject, input, OnInit } from '@angular/core';
import { GameState, Mole } from '../state/state';
import { MoleService } from '../state/mole.service';

@Component({
  selector: 'app-mole',
  standalone: true,
  imports: [],
  providers: [MoleService],
  templateUrl: './mole.component.html',
  styleUrl: './mole.component.scss',
})
export class MoleComponent implements OnInit {
  public readonly mole = input<Mole>();
  public readonly state = inject(GameState);
  public readonly moleService = inject(MoleService);

  public ngOnInit(): void {}

  public whackMole() {
    if (this.mole()?.state === 0) {
      return;
    }
    this.state.incrementScore();
    this.moleService.updateMolsAfterTrigger(this.mole()!);
  }
}
