import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';

import { copy } from '@core/content';
import { BrowserStorageActivityService } from '@core/services/browser-storage-activity.service';

import { SvgIconComponent } from '@shared/ui/svg-icon/svg-icon.component';

@Component({
  selector: 'trollysix-browser-storage-activity-indicator',
  imports: [SvgIconComponent],
  templateUrl: './browser-storage-activity-indicator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'block' },
})
export class BrowserStorageActivityIndicatorComponent {
  private readonly activityService = inject(BrowserStorageActivityService);

  public readonly copyServices = copy('services');
  public readonly isActive = computed(() => this.activityService.isActive());
}
