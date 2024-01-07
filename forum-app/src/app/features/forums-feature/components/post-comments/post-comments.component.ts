import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts/posts.service';
import { CommentComponent } from '../comment/comment.component';
import { CommentModel } from '../../models/comment.model';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { PostModel } from '../../models/post.model';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { ErrorComponent } from '../../../../shared/components/error/error.component';
import { FormUtilsService } from '../../../../core/services/form-utils/form-utils.service';

@Component({
  selector: 'app-post-comments',
  standalone: true,
  imports: [
    CommonModule,
    CommentComponent,
    InputTextareaModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    ErrorComponent
  ],
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCommentsComponent implements OnInit, OnDestroy {
  @Input() authState!: AuthStateModel;

  @Input()
  post!: PostModel;

  postsService = inject(PostsService);

  formUtils = inject(FormUtilsService);

  error$: Subject<string> = new Subject<string>();

  destroy$ = new Subject<boolean>();

  comments$ = new BehaviorSubject<CommentModel[]>([]);

  comment = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required]
  });

  ngOnInit() {
    this.comments$.next(this.post.comments);
  }

  deleteComment(id: number) {
    this.postsService
      .deleteComment(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          const postIndex = this.post.comments.findIndex((c) => {
            return c.id === id;
          });
          this.post.comments.splice(postIndex, 1);
          this.comments$.next(this.post.comments);
        }
      });
  }

  onSubmit() {
    this.error$.next('');
    if (this.comment.valid) {
      this.postsService
        .commentPost({
          postId: this.post.id,
          content: this.comment.getRawValue(),
          userEmail: this.post.user.email,
          postName: this.post.title,
          username: this.post.user.username
        })
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            data.user.username = this.authState.username;
            this.comment.reset();
            this.post.comments.push(data);
            this.comments$.next(this.post.comments);
          },
          error: (err) => {
            this.formUtils.handleSubmitError(err, this.comment, this.error$);
          }
        });
    } else {
      this.error$.next("Can't post empty comment");
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
