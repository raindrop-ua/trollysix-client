import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { ApiActivityIndicatorComponent } from '@core/ui/api-activity-indicator/api-activity-indicator.component';
import { ToastContainerComponent } from '@core/ui/toast-container/toast-container.component';

@Component({
  selector: 'trollysix-root',
  imports: [
    RouterOutlet,
    ApiActivityIndicatorComponent,
    ToastContainerComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
