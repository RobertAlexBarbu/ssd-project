import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-or-divider',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './or-divider.component.html',
  styleUrls: ['./or-divider.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrDividerComponent {}
