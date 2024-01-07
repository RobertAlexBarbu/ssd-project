import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { ForumsService } from '../../services/forums/forums.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { PostsService } from '../../services/posts/posts.service';
import { FormUtilsService } from '../../../../core/services/form-utils/form-utils.service';
import { ForumModel } from '../../models/forum.model';
import { CategoryModel } from '../../models/category.model';
import { ErrorComponent } from '../../../../shared/components/error/error.component';

@Component({
  selector: 'app-new-post-page',
  standalone: true,
  imports: [
    CommonModule,
    DropdownModule,
    ReactiveFormsModule,
    ChipsModule,
    InputTextareaModule,
    ButtonModule,
    RouterLink,
    ErrorComponent
  ],
  templateUrl: './new-post-page.component.html',
  styleUrls: ['./new-post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewPostPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  error$: Subject<string> = new Subject();

  forumsService = inject(ForumsService);

  postsService = inject(PostsService);

  route = inject(ActivatedRoute);

  router = inject(Router);

  formUtils = inject(FormUtilsService);

  forum$ = new Observable<ForumModel>();

  form = new FormGroup({
    category: new FormControl<CategoryModel | null>(null, {}),
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(32)]
    }),
    content: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    })
  });

  ngOnInit() {
    this.forum$ = this.forumsService.getForum(this.route.snapshot.params['id']);
  }

  onSubmit() {
    this.error$.next('');
    if (this.form.valid) {
      let categoryId: number | null = null;
      const category = this.form.controls['category'].getRawValue();
      if (category) {
        categoryId = category.id;
      }
      this.postsService
        .createPost({
          title: this.form.controls['title'].getRawValue(),
          content: this.form.controls['content'].getRawValue(),
          forumId: +this.route.snapshot.params['id'],
          categoryId: categoryId
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            return this.router.navigate(['../'], {
              relativeTo: this.route
            });
          },
          error: (err) => {
            this.formUtils.handleSubmitError(err, this.form, this.error$);
          }
        });
    } else {
      this.formUtils.markGroupDirty(this.form);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
