import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../../core/models/user.model';
import { FileUploadModule } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from '../../services/profile/profile.service';
import { AuthStateModel } from '../../../../core/models/auth-state.model';
import { IsUserPipe } from '../../../../shared/pipes/is-user.pipe';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { jamCameraF } from '@ng-icons/jam-icons';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [CommonModule, FileUploadModule, IsUserPipe, NgIcon],
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  viewProviders: [provideIcons({ jamCameraF })]
})
export class ProfilePictureComponent implements OnInit, OnDestroy {
  @Input() user!: UserModel;

  @Input() authState!: AuthStateModel;

  destroy$ = new Subject<boolean>();

  profileService = inject(ProfileService);

  profilePictureUrl$ = new Subject<string>();

  ngOnInit() {
    this.profileService
      .getProfilePictureURL(this.user.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (url) => {
          this.profilePictureUrl$.next(url);
        }
      });
  }

  onUpload(event: Event) {
    const target = event.target;
    if (target) {
      const fileList = (target as HTMLInputElement).files;
      if (fileList) {
        const file = fileList[0];
        this.profileService
          .uploadProfilePicture(file, this.user.id)
          .then(() => {
            this.profilePictureUrl$.next(URL.createObjectURL(file));
          });
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
