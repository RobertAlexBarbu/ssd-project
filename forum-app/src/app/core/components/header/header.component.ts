import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthStateModel } from '../../models/auth-state.model';
import { Observable } from 'rxjs';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamAlignJustify } from '@ng-icons/jam-icons';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from '../navbar/navbar.component';
import { ModalComponent } from '../../../shared/components/modal/modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    NgIcon,
    ButtonModule,
    NavbarComponent,
    ModalComponent
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  viewProviders: [provideIcons({ jamAlignJustify })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  @Input() check$!: Observable<boolean>;

  @Input() authState!: AuthStateModel;

  isVisible = false;

  openMenu() {
    this.isVisible = true;
  }

  closeMenu() {
    this.isVisible = false;
  }
}
