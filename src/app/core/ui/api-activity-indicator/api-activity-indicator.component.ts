import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { ApiActivityService } from '@core/services/api-activity.service';

import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-api-activity-indicator',
  imports: [SvgIconComponent],
  templateUrl: './api-activity-indicator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ApiActivityIndicatorComponent {
  private readonly activityService = inject(ApiActivityService);

  readonly isActive = computed(() => this.activityService.isActive());
}
