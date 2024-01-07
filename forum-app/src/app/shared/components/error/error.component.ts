import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {
  _errorMessage = '';

  currentClass = '';

  @Input()
  set errorMessage(value: string | null) {
    if (value !== null && value !== '') {
      this._errorMessage = value;
      this.currentClass = 'reveal';
    } else if (value === '') {
      this.currentClass = '';
    }
  }

  get errorMessage() {
    return this._errorMessage;
  }
}
