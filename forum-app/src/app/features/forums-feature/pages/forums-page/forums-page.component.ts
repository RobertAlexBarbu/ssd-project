import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamPlus } from '@ng-icons/jam-icons';
import { RouterLink } from '@angular/router';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ForumsService } from '../../services/forums/forums.service';
import { ForumComponent } from '../../components/forum/forum.component';
import { ForumModel } from '../../models/forum.model';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { Store } from '@ngrx/store';
import { isAdminPipe } from '../../../../shared/pipes/is-admin.pipe';
import { FormUtilsService } from '../../../../core/services/form-utils/form-utils.service';

@Component({
  selector: 'app-forums-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    NgIcon,
    RouterLink,
    ModalComponent,
    FormsModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    ForumComponent,
    isAdminPipe
  ],
  templateUrl: './forums-page.component.html',
  styleUrls: ['./forums-page.component.scss'],
  viewProviders: [provideIcons({ jamPlus })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForumsPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  addForumModal = false;

  deleteForumModal = false;

  toBeDeletedForum: ForumModel | null = null;

  loading = false;

  error$ = new Subject<string>();

  forums$ = new Subject<ForumModel[]>();

  forums: ForumModel[] = [];

  formUtils = inject(FormUtilsService);

  authState$: Observable<AuthStateModel> = inject(Store).select('auth');

  forumsService = inject(ForumsService);

  addForumForm = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(32)]
  });

  ngOnInit() {
    this.forumsService
      .getForums()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.forums$.next(data);
          this.forums = data;
        }
      });
  }

  openDeleteModal(forum: ForumModel) {
    this.error$.next('');
    this.toBeDeletedForum = forum;
    this.deleteForumModal = true;
  }

  closeDeleteModal() {
    this.deleteForumModal = false;
  }

  openAddModal() {
    this.error$.next('');
    this.addForumForm.reset();
    this.addForumModal = true;
  }

  closeAddModal() {
    this.addForumModal = false;
  }

  deleteForum() {
    this.error$.next('');
    const deletedForum = this.toBeDeletedForum;
    if (!deletedForum) {
      return;
    }
    this.forumsService
      .deleteForum(deletedForum.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.forums.splice(
            this.forums.findIndex((forum) => forum.id === deletedForum.id),
            1
          );
          this.forums$.next(this.forums);
          this.deleteForumModal = false;
        },
        error: (err) => {
          this.error$.next(err.message);
        }
      });
  }

  addForum() {
    this.error$.next('');
    if (!this.addForumForm.valid) {
      this.addForumForm.markAsDirty();
      return;
    }
    this.loading = true;
    this.forumsService
      .createForum({ name: this.addForumForm.value })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.forums.push(data);
          this.forums$.next(
            this.forums.sort((a, b) => {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              } else {
                return -1;
              }
            })
          );
          this.loading = false;
          this.addForumModal = false;
        },
        error: (err) => {
          this.formUtils.handleSubmitError(err, this.addForumForm, this.error$);
          this.loading = false;
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
