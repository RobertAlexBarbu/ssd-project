import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../services/admin/admin.service';
import { AdminComponent } from '../../components/admin/admin.component';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamPlus } from '@ng-icons/jam-icons';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { InputTextModule } from 'primeng/inputtext';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { PaginatorModule } from 'primeng/paginator';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admins-page',
  standalone: true,
  imports: [
    CommonModule,
    AdminComponent,
    ButtonModule,
    NgIcon,
    FormsModule,
    InputTextModule,
    ModalComponent,
    PaginatorModule,
    ReactiveFormsModule,
    ErrorComponent
  ],
  templateUrl: './admins-page.component.html',
  styleUrls: ['./admins-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamPlus })]
})
export class AdminsPageComponent implements OnDestroy, OnInit {
  adminService = inject(AdminService);

  destroy$ = new Subject<boolean>();

  admins$ = new BehaviorSubject<UserModel[]>([]);

  admins: UserModel[] = [];

  error$: Subject<string> = new Subject<string>();

  addAdminForm = new FormControl('', {
    validators: Validators.required,
    nonNullable: true
  });

  ngOnInit() {
    this.adminService
      .findAdmins()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.admins$.next(data);
          this.admins = data;
        }
      });
  }

  addAdmin() {
    this.error$.next('');
    if (this.addAdminForm.valid) {
      this.adminService
        .updateToAdmin({ username: this.addAdminForm.getRawValue() })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            if (data === null) {
              this.error$.next('User not found');
            } else {
              this.admins.push(data);
              this.admins$.next(
                this.admins.sort((a, b) => {
                  if (a.username > b.username) {
                    return 1;
                  } else {
                    return -1;
                  }
                })
              );
            }
          }
        });
    } else {
      this.addAdminForm.markAsDirty();
    }
  }

  demoteAdmin(id: string) {
    this.adminService
      .demoteAdmin(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.admins.splice(
            this.admins.findIndex((user) => {
              return user.id === id;
            }),
            1
          );
          this.admins$.next(this.admins);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
