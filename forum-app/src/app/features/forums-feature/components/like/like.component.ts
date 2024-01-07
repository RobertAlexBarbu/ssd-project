import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { PostsService } from '../../services/posts/posts.service';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { PostModel } from '../../models/post.model';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-like',
  standalone: true,
  imports: [CommonModule, NgIcon],
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LikeComponent implements OnInit, OnDestroy {
  @Input()
  post!: PostModel;

  @Input()
  authState!: AuthStateModel;

  destroy$ = new Subject<boolean>();

  postsService = inject(PostsService);

  liked = false;

  likes = 0;

  likes$ = new BehaviorSubject<number>(0);

  userId!: string;

  ngOnInit() {
    this.userId = this.authState.id;
    if (
      this.post.postLikes.find((like) => {
        return like.user.id == this.userId;
      })
    ) {
      this.liked = true;
    }
    this.likes = this.post.postLikes.length;
    this.likes$.next(this.post.postLikes.length);
  }

  likePost() {
    this.postsService
      .likePost(this.post.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.likes += 1;
    this.likes$.next(this.likes);
    this.liked = true;
  }

  dislikePost() {
    this.likes -= 1;
    this.likes$.next(this.likes);
    this.postsService
      .dislikePost(this.post.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe();
    this.liked = false;
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
