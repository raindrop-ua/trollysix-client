import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastContainerComponent } from './core/components/toast-container/toast-container.component';
import { DialogComponent } from './core/components/dialog/dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastContainerComponent, DialogComponent],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
