import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnDestroy,
  OnInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { ColorService } from '../../services/color/color.service';
import { ForumsService } from '../../../forums-feature/services/forums/forums.service';
import { forkJoin, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { ForumModel } from '../../../forums-feature/models/forum.model';

@Component({
  selector: 'app-statistics-page',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './statistics-page.component.html',
  styleUrls: ['./statistics-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsPageComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  colorService = inject(ColorService);

  forumsService = inject(ForumsService);

  data: any = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  };

  data2: any = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  };

  data3: any = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor: []
      }
    ]
  };

  data$ = new Subject();

  data2$ = new Subject();

  data3$ = new Subject();

  options: any;

  options2: any;

  options3: any;

  ngOnInit() {
    this.forumsService
      .getForums()
      .pipe(
        switchMap((forums) => {
          const forumObservables: Observable<any>[] = [];
          forums.forEach((forum) => {
            forumObservables.push(this.forumsService.getForum(forum.id));
          });
          return forkJoin(forumObservables);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: (data) => {
          data.forEach((forum: ForumModel) => {
            this.data.labels.push(forum.name);
            this.data2.labels.push(forum.name);
            this.data3.labels.push(forum.name);
            this.data.datasets[0].data.push(forum.posts.length);
            let totalLikes = 0;
            forum.posts.forEach((post) => {
              totalLikes += post.postLikes.length;
            });
            this.data2.datasets[0].data.push(totalLikes);
            let totalComments = 0;
            forum.posts.forEach((post) => {
              totalComments += post.comments.length;
            });
            this.data3.datasets[0].data.push(totalComments);
            const color = this.colorService.generateRandomColor();
            this.data.datasets[0].backgroundColor.push(color);
            this.data.datasets[0].hoverBackgroundColor.push(color + '90');
            this.data2.datasets[0].backgroundColor.push(color);
            this.data2.datasets[0].hoverBackgroundColor.push(color + '90');
            this.data3.datasets[0].backgroundColor.push(color);
            this.data3.datasets[0].hoverBackgroundColor.push(color + '90');
          });
          this.data$.next(this.data);
          this.data2$.next(this.data2);
          this.data3$.next(this.data3);
        }
      });

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.options = {
      cutout: '30%',
      layout: {
        autoPadding: false,
        padding: 0
      },
      plugins: {
        legend: {
          position: 'right',
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
    this.options2 = {
      indexAxis: 'y',
      layout: {
        autoPadding: false,
        padding: 0
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
    this.options3 = {
      layout: {
        autoPadding: false,
        padding: 0
      },
      plugins: {
        legend: {
          display: false,
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

  ngOnDestroy() {
    this.destroy$.next(true);
  }
}
