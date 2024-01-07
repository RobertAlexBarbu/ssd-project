import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile/profile.service';
import { ActivatedRoute } from '@angular/router';
import { FileUploadModule } from 'primeng/fileupload';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ProfileModel } from '../../models/profile.model';
import { PostComponent } from '../../../forums-feature/components/post/post.component';
import { Store } from '@ngrx/store';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamCameraF } from '@ng-icons/jam-icons';
import { TimeAgoPipe } from '../../../../shared/pipes/time-ago.pipe';
import { ModalComponent } from '../../../../shared/components/modal/modal.component';
import { ProfilePictureComponent } from '../../components/profile-picture/profile-picture.component';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    FileUploadModule,
    PostComponent,
    NgIcon,
    TimeAgoPipe,
    ModalComponent,
    ProfilePictureComponent
  ],
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamCameraF })]
})
export class ProfilePageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  profileService = inject(ProfileService);

  route = inject(ActivatedRoute);

  profileSubject$: BehaviorSubject<Observable<ProfileModel>> =
    new BehaviorSubject<Observable<ProfileModel>>(
      this.profileService.getProfile(this.route.snapshot.params['username'])
    );

  authState$: Observable<AuthStateModel> = inject(Store).select('auth');

  ngOnInit() {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe({
      next: (params) => {
        this.profileSubject$.next(
          this.profileService.getProfile(params['username'])
        );
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
