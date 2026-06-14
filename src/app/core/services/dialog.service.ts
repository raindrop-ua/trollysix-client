import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  createComponent,
  ApplicationRef,
  EnvironmentInjector,
  inject,
  ComponentRef,
  PLATFORM_ID,
  Service,
} from '@angular/core';

import { Observable, Subject, take } from 'rxjs';

import { DialogConfig, DialogResult } from '@core/models/dialog.models';
import { DialogComponent } from '@core/ui/dialog/dialog.component';

@Service()
export class DialogService {
  private appRef = inject(ApplicationRef);
  private injector = inject(EnvironmentInjector);
  private readonly document = inject(DOCUMENT, { optional: true });
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private activeDialogs: ComponentRef<DialogComponent>[] = [];
  private openDialogsCount = 0;
  private previousBodyOverflow = '';

  open(config: DialogConfig): Observable<DialogResult> {
    const result$ = new Subject<DialogResult>();
    if (!this.isBrowser || !this.document?.body) {
      result$.complete();
      return result$;
    }

    const componentRef = createComponent(DialogComponent, {
      environmentInjector: this.injector,
    });

    componentRef.instance.config.set(config);
    componentRef.instance.result$.pipe(take(1)).subscribe((res) => {
      result$.next(res);
      result$.complete();
      this.destroyDialog(componentRef);
    });

    this.appRef.attachView(componentRef.hostView);
    this.document.body.appendChild(componentRef.location.nativeElement);

    this.activeDialogs.push(componentRef);
    this.lockBodyScroll();

    return result$;
  }

  private destroyDialog(ref: ComponentRef<DialogComponent>) {
    this.appRef.detachView(ref.hostView);
    ref.destroy();
    this.activeDialogs = this.activeDialogs.filter((d) => d !== ref);
    this.unlockBodyScrollIfNeeded();
  }

  private lockBodyScroll(): void {
    if (!this.document?.body) {
      return;
    }

    if (this.openDialogsCount === 0) {
      this.previousBodyOverflow = this.document.body.style.overflow;
      this.document.body.style.overflow = 'hidden';
    }

    this.openDialogsCount += 1;
  }

  private unlockBodyScrollIfNeeded(): void {
    if (!this.document?.body || this.openDialogsCount === 0) {
      return;
    }

    this.openDialogsCount -= 1;
    if (this.openDialogsCount === 0) {
      this.document.body.style.overflow = this.previousBodyOverflow;
      this.previousBodyOverflow = '';
    }
  }
}
