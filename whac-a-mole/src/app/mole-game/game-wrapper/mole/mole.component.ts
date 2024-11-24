import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { GameState } from '../../mole-game.state';
import { MoleService } from '../../mole-game.service';
import { Mole } from '../../mole-game.entities';

@Component({
  selector: 'app-mole',
  standalone: true,
  imports: [],
  providers: [MoleService],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './mole.component.html',
  styleUrl: './mole.component.scss',
})
export class MoleComponent {
  public readonly mole = input<Mole>();
  public readonly state = inject(GameState);
  public readonly moleService = inject(MoleService);

  public whackMole() {
    if (this.mole()?.state === 0) {
      return;
    }
    this.state.incrementScore();
    this.moleService.updateMolsAfterTrigger(this.mole()!);
  }
}
