import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  Renderer2
} from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from '../../../core/components/navbar/navbar.component';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamClose } from '@ng-icons/jam-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, ButtonModule, NavbarComponent, NgIcon],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  viewProviders: [provideIcons({ jamClose })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  private _visible = false;

  renderer2 = inject(Renderer2);

  document = inject(DOCUMENT);

  elementRef = inject(ElementRef);

  @Output() isVisibleChange = new EventEmitter();

  @Input()
  set isVisible(value: boolean) {
    const menu = this.elementRef.nativeElement.querySelector('.modal');
    if (value) {
      this.document.body.style.position = 'fixed';
      if (menu !== null) {
        (menu as HTMLElement).style.display = 'flex';
      }
      this.renderer2.addClass(menu, 'modal-active');
      this.renderer2.removeClass(menu, 'modal-closed');
    } else {
      this.document.body.style.position = 'static';
      this.renderer2.addClass(menu, 'modal-closed');
      this.renderer2.removeClass(menu, 'modal-active');
      setTimeout(() => {
        if (menu !== null) {
          (menu as HTMLElement).style.display = 'none';
        }
      }, 170);
      this.isVisibleChange.emit(false);
    }
    this._visible = value;
  }

  closeMenu() {
    this.isVisible = false;
  }
}
