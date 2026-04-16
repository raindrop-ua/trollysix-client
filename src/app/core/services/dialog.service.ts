import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  createComponent,
  ApplicationRef,
  EnvironmentInjector,
  inject,
  Injectable,
  ComponentRef,
  PLATFORM_ID,
} from '@angular/core';

import { Subject } from 'rxjs';

import { DialogConfig, DialogResult } from '@core/models/dialog.models';
import { DialogComponent } from '@core/ui/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private activeDialogs: ComponentRef<DialogComponent>[] = [];

  open(config: DialogConfig): Subject<DialogResult> {
    const result$ = new Subject<DialogResult>();
    if (!this.isBrowser || !this.document?.body) {
      result$.complete();
      return result$;
    }

    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.injector,
    });

    componentRef.instance.config.set(config);
    componentRef.instance.result$.subscribe((res) => {
      result$.next(res);
      this.destroyDialog(componentRef);
    });

    this.appRef.attachView(componentRef.hostView);
    this.document.body.appendChild(componentRef.location.nativeElement);

    this.activeDialogs.push(componentRef);

    return result$;
  }

  private destroyDialog(ref: ComponentRef<DialogComponent>) {
    this.appRef.detachView(ref.hostView);
    ref.destroy();
    this.activeDialogs = this.activeDialogs.filter((d) => d !== ref);
  }
}
