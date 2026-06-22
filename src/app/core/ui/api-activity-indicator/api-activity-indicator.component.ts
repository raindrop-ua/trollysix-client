import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { ApiActivityService } from '@core/services/api-activity.service';

@Component({
  selector: 'trollysix-api-activity-indicator',
  imports: [],
  templateUrl: './api-activity-indicator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class ApiActivityIndicatorComponent {
  private readonly activityService = inject(ApiActivityService);

  readonly isActive = computed(() => this.activityService.isActive());
}
