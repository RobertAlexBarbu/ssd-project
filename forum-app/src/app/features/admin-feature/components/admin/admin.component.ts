import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../../core/models/user.model';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamShieldCloseF } from '@ng-icons/jam-icons';
import { DockModule } from 'primeng/dock';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, ButtonModule, NgIcon, DockModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamShieldCloseF })]
})
export class AdminComponent {
  @Input() admin!: UserModel;

  @Output() demote = new EventEmitter<string>();

  demoteAdmin() {
    this.demote.emit(this.admin.id);
  }
}
