import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ForumsService } from '../../services/forums/forums.service';
import { PostComponent } from '../../components/post/post.component';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthStateModel } from '../../../../core/models/auth-state.model';

@Component({
  selector: 'app-posts-page',
  standalone: true,
  imports: [CommonModule, PostComponent, NgOptimizedImage],
  templateUrl: './posts-page.component.html',
  styleUrls: ['./posts-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsPageComponent {
  forumsService = inject(ForumsService);

  route = inject(ActivatedRoute);

  authState$: Observable<AuthStateModel> = inject(Store).select('auth');

  forum$ = this.forumsService.getForum(this.route.snapshot.params['id']);
}
