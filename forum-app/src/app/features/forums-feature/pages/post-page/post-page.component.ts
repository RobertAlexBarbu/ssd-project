import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsService } from '../../services/posts/posts.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  jamArrowSquareUp,
  jamArrowSquareUpF,
  jamMessageWritingF,
  jamPencilF,
  jamTrashF
} from '@ng-icons/jam-icons';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { PaginatorModule } from 'primeng/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CommentComponent } from '../../components/comment/comment.component';
import { PostModel } from '../../models/post.model';
import { TooltipModule } from 'primeng/tooltip';
import { isAdminPipe } from '../../../../shared/pipes/is-admin.pipe';
import { LikeComponent } from '../../components/like/like.component';
import { PostCommentsComponent } from '../../components/post-comments/post-comments.component';

@Component({
  selector: 'app-post-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    TimeAgoPipe,
    NgIcon,
    InputTextareaModule,
    PaginatorModule,
    ReactiveFormsModule,
    ButtonModule,
    CommentComponent,
    TooltipModule,
    isAdminPipe,
    LikeComponent,
    PostCommentsComponent
  ],
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [
    provideIcons({
      jamArrowSquareUp,
      jamArrowSquareUpF,
      jamMessageWritingF,
      jamTrashF,
      jamPencilF
    })
  ]
})
export class PostPageComponent implements OnInit, OnDestroy {
  postsService = inject(PostsService);

  route = inject(ActivatedRoute);

  destroy$ = new Subject<boolean>();

  router = inject(Router);

  authState$ = inject(Store).select('auth');

  post$!: Observable<PostModel>;

  ngOnInit() {
    this.post$ = this.postsService.getPost(this.route.snapshot.params['post']);
  }

  deletePost(post: PostModel) {
    this.postsService
      .deletePost(post.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          return this.router.navigate(['forums', post.forum.id]);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
