import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChipsModule } from 'primeng/chips';
import { ButtonModule } from 'primeng/button';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamPencilF, jamPlus, jamTrashF } from '@ng-icons/jam-icons';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ForumsService } from '../../services/forums/forums.service';
import { Subject, takeUntil } from 'rxjs';
import { CategoryModel } from '../../models/category.model';
import { ForumModel } from '../../models/forum.model';

@Component({
  selector: 'app-new-forum-page',
  standalone: true,
  imports: [
    CommonModule,
    ChipsModule,
    ButtonModule,
    NgIcon,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './edit-forum-page.component.html',
  styleUrls: ['./edit-forum-page.component.scss'],
  viewProviders: [provideIcons({ jamPlus, jamTrashF, jamPencilF })],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditForumPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  route = inject(ActivatedRoute);

  router = inject(Router);

  forumsService = inject(ForumsService);

  forum!: ForumModel;

  categories: CategoryModel[] = [];

  categoriesDeleted: { id: number; name: string }[] = [];

  categoriesAdded: { name: string }[] = [];

  categories$: Subject<CategoryModel[]> = new Subject<CategoryModel[]>();

  errors$: Subject<string> = new Subject<string>();

  categoryName = new FormControl('', {
    nonNullable: true,
    updateOn: 'blur',
    validators: [Validators.required]
  });

  forumName = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  ngOnInit() {
    this.forumsService
      .getForumForEdit(this.route.snapshot.params['id'])
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.forum = data;
          this.categories = data.categories;
          this.categories$.next(this.categories);
          this.forumName.patchValue(data.name);
        }
      });
  }

  addCategory() {
    if (!this.categoryName.valid) {
      this.categoryName.markAsDirty();
      return;
    }
    this.categoriesAdded.push({
      name: this.categoryName.getRawValue()
    });
    this.categories.push({
      name: this.categoryName.getRawValue(),
      id: -1
    });
    this.categories$.next(this.categories);
    this.categoryName.reset();
  }

  deleteCategory(category: CategoryModel, index: number) {
    this.categories.splice(index, 1);
    this.categories$.next(this.categories);
    if (category.id > 0) {
      this.categoriesDeleted.push(category);
    } else {
      this.categoriesAdded.splice(
        this.categoriesAdded.findIndex((c) => {
          return c.name == category.name;
        }),
        1
      );
    }
  }

  onSubmit() {
    if (this.forumName.valid) {
      this.forumsService
        .updateForum(this.route.snapshot.params['id'], {
          name: this.forumName.getRawValue(),
          deletedCategories: this.categoriesDeleted,
          addedCategories: this.categoriesAdded
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            return this.router.navigate(['forums']);
          },
          error: (err) => {
            this.errors$.next(err.message);
          }
        });
    } else {
      this.forumName.markAsDirty();
      this.categoryName.markAsPristine();
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
