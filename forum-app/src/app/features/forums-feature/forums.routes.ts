import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ForumsPageComponent } from './pages/forums-page/forums-page.component';
import { ForumPageComponent } from './pages/forum-page/forum-page.component';
import { PostPageComponent } from './pages/post-page/post-page.component';
import { PostsPageComponent } from './pages/posts-page/posts-page.component';
import { isAdminGuard } from '../../core/guards/is-admin.guard';
import { isAuthGuard } from '../../core/guards/is-auth.guard';

export const forumsRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'forums',
    children: [
      {
        path: '',
        component: ForumsPageComponent
      },
      {
        path: 'edit/:id',
        canMatch: [isAdminGuard],
        loadComponent: () =>
          import('./pages/edit-forum-page/edit-forum-page.component').then(
            (m) => m.EditForumPageComponent
          )
      },
      {
        path: ':id/posts/edit/:post',
        canMatch: [isAuthGuard],
        loadComponent: () =>
          import('./pages/edit-post-page/edit-post-page.component').then(
            (m) => m.EditPostPageComponent
          )
      },
      {
        path: ':id',
        component: ForumPageComponent,
        children: [
          {
            path: '',
            component: PostsPageComponent
          },

          {
            path: 'posts/:post',
            component: PostPageComponent
          }
        ]
      },
      {
        path: ':id/new-post',
        canMatch: [isAuthGuard],
        loadComponent: () =>
          import('./pages/new-post-page/new-post-page.component').then(
            (m) => m.NewPostPageComponent
          )
      }
    ]
  }
];
